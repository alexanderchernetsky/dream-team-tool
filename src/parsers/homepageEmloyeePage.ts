import {
    parseAsArray,
    parseAsNumber,
    parseAsObject,
    parseAsString,
    safelyParseOr,
    parseUser,
    parseAttributes
} from "./common";
import {IFeedItems} from "../interfaces/HomepageEmployee";

const parseHomepageEmployeeResponse = (response :unknown) :IFeedItems => {
    const responseData = safelyParseOr(response, 'data', parseAsObject, {} as unknown);
    const arrayToParse = safelyParseOr(responseData, 'data', parseAsArray, [] as unknown[]);

    return {
        data: arrayToParse.map(item => {
                const author = safelyParseOr(item, 'author', parseAsObject, {} as unknown);
                const user = safelyParseOr(item, 'user', parseAsObject, {} as unknown);
                const attributes = safelyParseOr(item, 'attributes', parseAsObject, {} as unknown);
                return {
                    attributes: parseAttributes(attributes),
                    author: parseUser(author),
                    author_id: safelyParseOr(item, 'author_id', parseAsNumber, 0),
                    created_at: safelyParseOr(item, 'created_at', parseAsString, ''),
                    id: safelyParseOr(item, 'id', parseAsNumber, 0),
                    rating: safelyParseOr(item, 'rating', parseAsNumber, 0),
                    updated_at: safelyParseOr(item, 'updated_at', parseAsString, ''),
                    user_id: safelyParseOr(item, 'user_id', parseAsNumber, 0),
                    user: parseUser(user)
                }
            }
        )
    }
}

export default parseHomepageEmployeeResponse;