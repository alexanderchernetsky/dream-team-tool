import {
    parseAsNumber,
    parseAsString,
    safelyParseOr
} from "./common";
import {ILoginPageResponse} from "../interfaces/LoginPage";
import {parseUser} from "./parseUser";
import {IUser} from "../interfaces/user";

const parseLoginResponse = (response :unknown) :ILoginPageResponse => {
    return {
        access_token: safelyParseOr(response, 'data.access_token', parseAsString, ''),
        expires_in: safelyParseOr(response, 'data.expires_in', parseAsNumber, 0),
        token_type: safelyParseOr(response, 'data.token_type', parseAsString, ''),
        user: safelyParseOr(response, "data.user", parseUser, {} as IUser)
    };
}

export default parseLoginResponse;