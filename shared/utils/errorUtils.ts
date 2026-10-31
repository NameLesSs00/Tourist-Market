import axios from "axios";

/**
 * Normalizes any value to a human-readable string message,
 * stripping any trailing period to allow clean sentence joining.
 */
function toMessageString(val: unknown): string {
  let str = "";
  if (typeof val === "string") {
    str = val.trim();
  } else if (val && typeof val === "object") {
    const candidate = val as Record<string, unknown>;
    if (typeof candidate.description === "string") str = candidate.description.trim();
    else if (typeof candidate.message === "string") str = candidate.message.trim();
    else if (typeof candidate.errorMessage === "string") str = candidate.errorMessage.trim();
    else if (typeof candidate.error === "string") str = candidate.error.trim();
    else if (typeof candidate.detail === "string") str = candidate.detail.trim();
    else if (typeof candidate.msg === "string") str = candidate.msg.trim();
    else if (typeof candidate.reason === "string") str = candidate.reason.trim();
    else if (Array.isArray(candidate.errors)) {
      str = candidate.errors.map(toMessageString).filter(Boolean).join(". ");
    }
  }

  if (str.endsWith(".")) {
    str = str.slice(0, -1).trim();
  }
  return str;
}

/**
 * Extracts all error messages from an ASP.NET ModelState validation dictionary,
 * array of validation errors, or IdentityResult error items.
 */
function extractFromErrorsContainer(errors: unknown): string[] {
  if (!errors) return [];

  // Case 1: Array of strings or error objects (e.g. ["English translation cannot exceed 500 characters."])
  if (Array.isArray(errors)) {
    return errors.map(toMessageString).filter((msg): msg is string => Boolean(msg));
  }

  // Case 2: Object dictionary { [fieldName]: string[] | string | object }
  if (typeof errors === "object") {
    const messages: string[] = [];
    for (const key of Object.keys(errors as Record<string, unknown>)) {
      const val = (errors as Record<string, unknown>)[key];
      if (Array.isArray(val)) {
        for (const item of val) {
          const str = toMessageString(item);
          if (str) messages.push(str);
        }
      } else {
        const str = toMessageString(val);
        if (str) messages.push(str);
      }
    }
    return messages;
  }

  // Case 3: Simple string
  if (typeof errors === "string" && errors.trim().length > 0) {
    const str = toMessageString(errors);
    return str ? [str] : [];
  }

  return [];
}

/**
 * Checks if a string looks like a full raw HTML response (e.g. IIS / Cloudflare 502/503 page).
 */
function isHtmlDocument(str: string): boolean {
  const trimmed = str.trim().toLowerCase();
  return (
    trimmed.startsWith("<!doctype") ||
    trimmed.startsWith("<html") ||
    trimmed.startsWith("<head") ||
    trimmed.startsWith("<body")
  );
}

/**
 * Comprehensive utility helper to extract user-friendly error messages from backend responses.
 * Supports:
 * - Custom API wrappers: { message, Message, errors: string[] }
 * - RFC 7807 ProblemDetails: { detail, Detail, title, Title, errors: { ... } }
 * - ASP.NET ModelState validation: { errors: { field: ["msg"] } }
 * - ASP.NET Identity errors: { errors: [{ code, description }] }
 * - Error objects: { error, Error, errorMessage, ErrorMessage }
 * - Raw string bodies
 * - Network timeouts and connection drops
 * - Fallbacks based on HTTP status codes
 */
export function extractErrorMessage(error: unknown, fallback?: string): string {
  if (!error) {
    return fallback || "An unexpected error occurred. Please check your connection.";
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error.trim();
  }

  if (typeof error === "object") {
    const errObj = error as Record<string, unknown>;

    // Locate response payload data
    let data: unknown = null;
    let responseStatus: number | undefined;

    if (errObj.response && typeof errObj.response === "object") {
      const resp = errObj.response as Record<string, unknown>;
      data = resp.data;
      if (typeof resp.status === "number") {
        responseStatus = resp.status;
      }
    } else if (errObj.data && typeof errObj.data === "object") {
      data = errObj.data;
      if (typeof errObj.status === "number") {
        responseStatus = errObj.status;
      }
    } else if (
      "errors" in errObj ||
      "Errors" in errObj ||
      "message" in errObj ||
      "Message" in errObj ||
      "detail" in errObj ||
      "Detail" in errObj
    ) {
      data = errObj;
    }

    if (data) {
      // 1. Raw string response body (e.g. text/plain from backend)
      if (typeof data === "string") {
        const trimmed = data.trim();
        if (!isHtmlDocument(trimmed) && trimmed.length > 0) {
          if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            try {
              const parsed = JSON.parse(trimmed);
              return extractErrorMessage(parsed, fallback);
            } catch {
              // Ignore parse error and return trimmed string
            }
          }
          return trimmed;
        }
      }

      // 2. Object response body
      if (typeof data === "object") {
        const record = data as Record<string, unknown>;

        // A. ASP.NET ModelState or Identity validation errors dictionary / list
        // Prioritize specific validation error messages over generic "Validation failed."
        const validationMessages = extractFromErrorsContainer(record.errors ?? record.Errors);
        if (validationMessages.length > 0) {
          const joined = validationMessages.join(". ");
          const msg = typeof record.message === "string" ? record.message.trim() : "";
          if (
            msg &&
            !msg.toLowerCase().includes("validation failed") &&
            !msg.toLowerCase().includes("one or more validation errors") &&
            !joined.toLowerCase().includes(msg.toLowerCase())
          ) {
            return `${msg}: ${joined}.`;
          }
          return `${joined}.`;
        }

        // B. Nested data object errors
        if (record.data && typeof record.data === "object") {
          const nestedData = record.data as Record<string, unknown>;
          const nestedValidation = extractFromErrorsContainer(nestedData.errors ?? nestedData.Errors);
          if (nestedValidation.length > 0) {
            return `${nestedValidation.join(". ")}.`;
          }
          if (typeof nestedData.message === "string" && nestedData.message.trim().length > 0) {
            return nestedData.message.trim();
          }
        }

        // C. RFC 7807 ProblemDetails: detail is the most specific field
        const detail = record.detail ?? record.Detail;
        if (typeof detail === "string" && detail.trim().length > 0) {
          return detail.trim();
        }

        // D. Standard API response message field (camelCase and PascalCase)
        const message = record.message ?? record.Message;
        if (typeof message === "string" && message.trim().length > 0) {
          return message.trim();
        }

        // E. Simple error / errorMessage keys
        const errorField =
          record.errorMessage ??
          record.ErrorMessage ??
          record.error ??
          record.Error;
        if (typeof errorField === "string" && errorField.trim().length > 0) {
          return errorField.trim();
        }

        // F. RFC 7807 ProblemDetails: title field
        const title = record.title ?? record.Title;
        if (
          typeof title === "string" &&
          title.trim().length > 0 &&
          title.toLowerCase() !== "one or more validation errors occurred."
        ) {
          return title.trim();
        }
      }
    }

    // 3. Fallbacks based on HTTP status if no body message was extracted
    if (responseStatus !== undefined) {
      if (responseStatus === 400) {
        return fallback || "Invalid request. Please check the submitted data.";
      }
      if (responseStatus === 401) {
        return fallback || "Your session has expired or you are unauthorized. Please sign in.";
      }
      if (responseStatus === 403) {
        return fallback || "You do not have permission to perform this action.";
      }
      if (responseStatus === 404) {
        return fallback || "The requested item was not found.";
      }
      if (responseStatus === 409) {
        return fallback || "A conflict occurred with existing data. Please refresh and try again.";
      }
      if (responseStatus === 422) {
        return fallback || "Validation failed for the submitted information.";
      }
      if (responseStatus >= 500) {
        return fallback || "Server error occurred. Please try again later.";
      }
    }

    // 4. Network level errors
    if (
      errObj.code === "ECONNABORTED" ||
      (typeof errObj.message === "string" && errObj.message.toLowerCase().includes("timeout"))
    ) {
      return "The request timed out. Please check your connection and try again.";
    }
    if (
      errObj.message === "Network Error" ||
      (axios.isAxiosError(error) && !error.response)
    ) {
      return "Network connection issue. Please check your internet connection.";
    }

    if (typeof errObj.userMessage === "string" && errObj.userMessage.trim().length > 0) {
      return errObj.userMessage.trim();
    }

    if (typeof errObj.message === "string" && errObj.message.trim().length > 0) {
      return errObj.message.trim();
    }
  }

  // Generic JavaScript Error
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback || "An unexpected error occurred. Please check your connection.";
}
