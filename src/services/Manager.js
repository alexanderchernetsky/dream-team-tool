import axios from "axios";
import createSearchString from "../helpers/createSearchString";

export class ApiBackendManager {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_PATH_BACK
    });
  }

  setHeader(name, value) {
    this.instance.defaults.headers.common[name] = value;
    if (!value) {
      delete this.instance.defaults.headers.common[name];
    }
  }

  setAuthHeader(token) {
    this.setHeader("Authorization", token);
  }

  login = async (params) => {
    const response = await this.instance.post(`/login`, params);
    return response;
  };

  getFeedItems = async (params) => {
    const response = await this.instance.get(`/feed${createSearchString(params)}`);
    return response;
  }
}

export default new ApiBackendManager();
