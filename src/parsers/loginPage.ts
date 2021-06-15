import {
    parseAsNumber,
    parseAsObject,
    parseAsString,
    parseUser,
    safelyParseOr
} from "./common";
import {ILoginPageResponse} from "../interfaces/LoginPage";

const parseLoginResponse = (response :unknown) :ILoginPageResponse => {
    const data = safelyParseOr(response, 'data', parseAsObject, {} as unknown);
    const user = safelyParseOr(data, 'user', parseAsObject, {} as unknown);

    return {
        access_token: safelyParseOr(data, 'access_token', parseAsString, ''),
        expires_in: safelyParseOr(data, 'expires_in', parseAsNumber, 0),
        token_type: safelyParseOr(data, 'token_type', parseAsString, ''),
        user: parseUser(user)
    };
}

export default parseLoginResponse;