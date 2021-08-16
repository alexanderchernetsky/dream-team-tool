import {
    safelyParseOr,
    parseAsArray,
    parseAsNumber,
    parseAsString,
} from "./common";
import {IAttributes, ITeamAnalysisUser, IUser} from "../interfaces/user";
import parseAttributes from "./parseAttributes";
import {parseUser} from "./parseUser";

const parseAnalysisData = (response :unknown): ITeamAnalysisUser[] => {

    const data = safelyParseOr(response, 'data', parseAsArray, [] as unknown[]);
    return data.map(item => {
        const reviews = safelyParseOr(item, 'item.user.reviews', parseAsArray, [] as unknown[]);
        const user :IUser = safelyParseOr(item, "user", parseUser, {} as IUser)
        return {
            user: {
                reviews:
                    reviews.map(review => {

                        return {
                            attributes: safelyParseOr(review, "attributes",parseAttributes, {} as IAttributes),
                            author_id: safelyParseOr(review, 'author_id', parseAsNumber, 0),
                            created_at: safelyParseOr(review, 'created_at', parseAsString, ""),
                            id: safelyParseOr(review, 'id', parseAsNumber, 0),
                            rating: safelyParseOr(review, 'rating', parseAsNumber, 0),
                            updated_at: safelyParseOr(review, 'updated_at', parseAsString, ""),
                            user_id: safelyParseOr(review, 'user_id', parseAsNumber, 0),
                        }
                    }),
                ...user
            },
            statistic: {
                negative: safelyParseOr(item, 'statistic.negative', parseAsNumber, 0),
                neutral: safelyParseOr(item, 'statistic.neutral', parseAsNumber, 0),
                positive: safelyParseOr(item, 'statistic.positive', parseAsNumber, 0),
            }
        }
    })
}

export default parseAnalysisData;