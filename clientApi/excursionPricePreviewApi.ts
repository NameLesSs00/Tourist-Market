import apiClient from "./apiConfig";
import type {
  PreviewGroupPriceRequest,
  PreviewGroupPriceResponse,
  PreviewPrivatePriceRequest,
  PreviewPrivatePriceResponse,
} from "@/models/excursionPricePreview";

export const excursionPricePreviewApi = {
  previewPrivatePrice: async (
    excursionId: string,
    data: PreviewPrivatePriceRequest
  ): Promise<PreviewPrivatePriceResponse> => {
    const res = await apiClient.post<PreviewPrivatePriceResponse>(
      `/excursions/${excursionId}/private-price-preview`,
      data
    );
    return res.data;
  },

  previewGroupPrice: async (
    excursionId: string,
    data: PreviewGroupPriceRequest
  ): Promise<PreviewGroupPriceResponse> => {
    const res = await apiClient.post<PreviewGroupPriceResponse>(
      `/excursions/${excursionId}/group-price-preview`,
      data
    );
    return res.data;
  },
};

export default excursionPricePreviewApi;
