import axios from "axios";
import createSearchString from "../helpers/createSearchString";

export class ApiBackendManager {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_PATH_BACK,
    });
  }

  // Authentication

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

  // Employee Homepage

  getFeedItems = async (params) => {
    const response = await this.instance.get(
      `/feed${createSearchString(params)}`
    );
    return response;
  };

  getEmployeesList = async (params) => {
    const response = await this.instance.get(
      `users/list${createSearchString(params)}`
    );
    return response;
  };

  // Add feedback page

  getSpecificEmployeeData = async (id) => {
    const response = await this.instance.get(`/users/${id}`);
    return response;
  };

  sendFeedbackForm = async (formData, targetUserId) => {
    const response = await this.instance.post(
      `/users/${targetUserId}/reviews`,
      formData
    );
    return response;
  };

  // Manager Homepage

  getSelectOptions = async () => {
    const response = await this.instance.get(`/users/filter-data`);
    return response;
  };

  getGridData = async (params) => {
    const response = await this.instance.get(
      `/users${createSearchString(params)}`
    );
    return response;
  };
}

export default new ApiBackendManager();
