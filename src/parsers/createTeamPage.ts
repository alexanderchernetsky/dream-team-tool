import {
    safelyParseOr,
    parseAsArray,
    parseAsObject,
    parseAttributes,
    parseAsNumber,
    parseAsString,
    parseUser
} from "./common";
import {ITeamAnalysisUser} from "../interfaces/user";

const parseAnalysisData = (response :unknown): ITeamAnalysisUser[] => {

    const data = safelyParseOr(response, 'data', parseAsArray, [] as unknown[]);
    return data.map(item => {
        const user = safelyParseOr(item, 'user', parseAsObject, {} as unknown);
        const reviews = safelyParseOr(user, 'reviews', parseAsArray, [] as unknown[]);
        const statistic = safelyParseOr(item, 'statistic', parseAsObject, {} as unknown);
        return {
            user: {
                reviews:
                    reviews.map(review => {
                        const attributes = safelyParseOr(review, 'attributes', parseAsObject, {} as unknown);
                        return {
                            attributes: parseAttributes(attributes),
                            author_id: safelyParseOr(review, 'author_id', parseAsNumber, 0),
                            created_at: safelyParseOr(review, 'created_at', parseAsString, ""),
                            id: safelyParseOr(review, 'id', parseAsNumber, 0),
                            rating: safelyParseOr(review, 'rating', parseAsNumber, 0),
                            updated_at: safelyParseOr(review, 'updated_at', parseAsString, ""),
                            user_id: safelyParseOr(review, 'user_id', parseAsNumber, 0),
                        }
                    }),
                ...parseUser(user),
            },
            statistic: {
                negative: safelyParseOr(statistic, 'negative', parseAsNumber, 0),
                neutral: safelyParseOr(statistic, 'neutral', parseAsNumber, 0),
                positive: safelyParseOr(statistic, 'positive', parseAsNumber, 0),
            }
        }
    })
}

export default parseAnalysisData;