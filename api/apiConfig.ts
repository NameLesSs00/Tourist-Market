// API Base URL configuration (easily switchable for local, sandbox, temp server, or production)
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.touristmarket.example/api";
