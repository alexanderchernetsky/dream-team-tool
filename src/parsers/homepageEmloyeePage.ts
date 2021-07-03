import {
    parseAsArray,
    parseAsNumber,
    parseAsString,
    safelyParseOr
} from "./common";
import {parseUser} from "./parseUser";
import parseAttributes from "./parseAttributes"
import {IAttributes, IHomepageEmployeeUser, IUser} from "../interfaces/user";

const parseHomepageEmployeeResponse = (response :unknown) :IHomepageEmployeeUser[] => {
    const arrayToParse = safelyParseOr(response, 'data.data', parseAsArray, [] as unknown[]);
    return arrayToParse.map(item => {
                return {
                    attributes: safelyParseOr(item, 'attributes', parseAttributes, {} as IAttributes),
                    author: safelyParseOr(item, 'author', parseUser, {} as IUser),
                    author_id: safelyParseOr(item, 'author_id', parseAsNumber, 0),
                    created_at: safelyParseOr(item, 'created_at', parseAsString, ''),
                    id: safelyParseOr(item, 'id', parseAsNumber, 0),
                    rating: safelyParseOr(item, 'rating', parseAsNumber, 0),
                    updated_at: safelyParseOr(item, 'updated_at', parseAsString, ''),
                    user_id: safelyParseOr(item, 'user_id', parseAsNumber, 0),
                    user: safelyParseOr(item, 'user', parseUser, {} as IUser),
                }
            }
        )
}

export default parseHomepageEmployeeResponse;