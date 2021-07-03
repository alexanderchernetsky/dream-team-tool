import {LoginPageActions, loginPageActionTypes} from "../actions/loginPageActions";
import {ILogin} from "../interfaces/LoginPage";

const initialState: ILogin = {
    loginInProgress: false,
    user: null,
    rememberChecked: false
}

export default function loginPageReducer(state = initialState, action: LoginPageActions): ILogin {
    switch (action.type) {
        case loginPageActionTypes.SET_LOGIN_IN_PROGRESS:
            return {
                ...state,
                loginInProgress: action.payload
            }
        case loginPageActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case loginPageActionTypes.SET_REMEMBER_CHECKED:
            return {
                ...state,
                rememberChecked: action.payload
            }
        default:
            return state;
    }
}