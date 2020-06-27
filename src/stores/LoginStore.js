// LoginStore.js
import { observable, action } from "mobx";
import Manager from "../services/Manager";
import {getToken, removeUserSession, setUserSession} from "../helpers/authentication";

class LoginStore {
  @observable loginInProgress = false;

  @action
  login(params) {
    this.loginInProgress = true;
    return Manager.login(params)
      .then((result) => {
        setUserSession(result?.data?.access_token, result?.data?.user);
        Manager.setAuthHeader(`Bearer ${getToken()}`);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.loginInProgress = false;
      });
  }

  @action
  logOut() {
    removeUserSession();
  }
}

export default new LoginStore();
