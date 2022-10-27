import { apiClient } from "@/core/api/httpClient";
import ApiDataListParam from "@/core/types/ApiDataListParam";
import DataListResponse from "@/core/types/DataListResponse";

export default class ModuleApi {
  constructor(protected readonly controllerName: string) {}

  async getItems<T>(params: ApiDataListParam): Promise<DataListResponse<T>> {
    const { data } = await apiClient.post(`/${this.controllerName}s/list`, {
      page: params.page || 1,
      filters: params.filters,
      item_per_page: 100,
    });
    return { data: data.data, paging: data.paging };
  }
}
