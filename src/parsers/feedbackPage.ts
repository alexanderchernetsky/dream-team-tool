import {parseAsObject, parseAsString, parseUser, safelyParseOr} from "./common";
import {IUser} from "../interfaces/user";
import {SelectOption} from "../interfaces/common";

export const parseSelectOptions = (response: unknown) :SelectOption[] => {
    const data = safelyParseOr(response, "data", parseAsObject, {});
    const resultsEntries: string[][] = Object.entries(data);

    return resultsEntries.map((item: unknown[]) => {
        return {
            value: safelyParseOr(item, "0", parseAsString, ""), // id
            label: safelyParseOr(item, "1", parseAsString, ""), // full name
        };
    });
}

export const parseEmployee = (response :unknown) :IUser => {
    const data = safelyParseOr(response, "data", parseAsObject, {});
    return parseUser(data);
}