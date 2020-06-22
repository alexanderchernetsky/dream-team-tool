// LoginStore.js
import { observable, action } from "mobx";
import Manager from "../services/Manager";

class LoginStore {
  @observable loginInProgress = false;

  @action
  login(params) {
    this.loginInProgress = true;
    Manager.login(params)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.loginInProgress = false;
      });
  }
}

export default new LoginStore();
