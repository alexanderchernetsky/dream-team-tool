import {parseAsString,  safelyParseOr} from "./common";
import {IUser} from "../interfaces/user";
import {ISelectOption} from "../interfaces/common";
import {parseUser} from "./parseUser";

import {IFeedbackResponse} from "../interfaces/FeedbackPage";

export const parseSelectOptions = (response: IFeedbackResponse) :ISelectOption[] => {

    const resultsEntries: string[][] = Object.entries(response.data);

    return resultsEntries.map((item: unknown[]) => {
        return {
            value: safelyParseOr(item, "0", parseAsString, ""), // id
            label: safelyParseOr(item, "1", parseAsString, ""), // full name
        };
    });
}

export const parseEmployee = (response :unknown) :IUser => {
    return safelyParseOr(response, "data", parseUser, {} as IUser);
}