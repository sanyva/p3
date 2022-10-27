import { AxiosInstance, AxiosResponse } from "axios";
import router from "@/router/index";

const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;

export default (client: AxiosInstance) => {
  client.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error) {
      if (UNAUTHORIZED_ERROR_CODE === error.response.status) {
        router.push("/login");
      } else if (FORBIDDEN_ERROR_CODE === error.response.status) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
};
