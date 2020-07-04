import { observable, action } from "mobx";
import Manager from "../services/Manager";
import {
  getToken,
  removeUserSession,
  setUserSession,
} from "../helpers/authentication";
import showErrorMessage from "../helpers/showErrorMessage";

class LoginStore {
  @observable loginInProgress = false;

  @observable user = {};

  @action
  login(params) {
    this.loginInProgress = true;
    return Manager.login(params)
      .then((result) => {
        setUserSession(result?.data?.access_token, result?.data?.user);
        Manager.setAuthHeader(`Bearer ${getToken()}`);
        this.user = result?.data?.user;
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loginInProgress = false;
      });
  }

  @action
  logOut() {
    removeUserSession();
    this.user = {};
  }

  @action
  getAndSetAuthHeader() {
    const token = getToken();
    if (token) {
      Manager.setAuthHeader(`Bearer ${getToken()}`);
    }
  }
}

export default new LoginStore();
