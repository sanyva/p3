import responseInterceptor from "./responseInterceptor";
import { apiClient } from "@/core/api/httpClient";

const init = () => {
  responseInterceptor(apiClient);
};

export default { init };
