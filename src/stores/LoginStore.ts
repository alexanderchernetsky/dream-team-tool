import { observable, action } from "mobx";
import Manager from "../services/Manager";
import {
  getToken,
  getUser,
  removeUserSession,
  setUserSession,
} from "../helpers/authentication";
import showErrorMessage from "../helpers/showErrorMessage";
import { IUser } from "../interfaces/user";

interface IParams {
  email: string;
  password: string;
}

interface ILogin {
  loginInProgress: boolean;
  user: IUser | null;
}

class LoginStore implements ILogin {
  @observable loginInProgress: boolean = false;

  @observable user: IUser | null = null;

  @action
  login(params: IParams) {
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
    this.user = null;
  }

  @action
  getAndSetAuthHeader() {
    const token = getToken();
    if (token) {
      Manager.setAuthHeader(`Bearer ${getToken()}`);
    }
  }

  @action
  getAndSetCurrentUser() {
    const user = getUser();
    if (user) {
      this.user = user;
    }
  }
}

export default new LoginStore();
