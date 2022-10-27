import { apiClient } from "@/core/api/httpClient";
import ModuleApi from "@/core/types/ModuleApi";

export default class CrudModuleApi extends ModuleApi {
  create(payload: object) {
    return apiClient.post(`${this.controllerName}s/create`, payload);
  }

  update(payload: object) {
    return apiClient.post(`${this.controllerName}/update`, payload);
  }

  getById<T>(id: number): Promise<T> {
    return apiClient
      .get(`/${this.controllerName}/get`, {
        params: { public_id: id },
      })
      .then((responce) => responce.data);
  }
}
