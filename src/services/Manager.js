import axios from "axios";

export class ApiBackendManager {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_PATH_BACK,
    });
  }

  login = async (params) => {
    const response = await this.instance.post(`/login`, params);
    return response;
  };
}

export default new ApiBackendManager();
