import {
    parseAsArray,
    parseAsObject,
    safelyParseOr,
    parseUser,
    parseAsNumber,
    parseAsStringArray
} from "./common";
import {IHomepageManagerGridData, IHomepageManagerSelectOptions} from "../interfaces/HomepageManager";

export const parseHomepageManagerGridData = (response :unknown) :IHomepageManagerGridData => {
    const responseData = safelyParseOr(response, 'data', parseAsObject, {} as unknown);
    const gridDataArray = safelyParseOr(responseData, 'data', parseAsArray, [] as unknown[]);

    const gridData = gridDataArray.map(item => {
        return ({...parseUser(item)})
    })

    const pagination = {
        total: safelyParseOr(responseData, 'total', parseAsNumber, 0),
        per_page: safelyParseOr(responseData, 'per_page', parseAsNumber, 0),
        current_page: safelyParseOr(responseData, 'current', parseAsNumber, 0),
    }

    return {
        ...pagination,
        data: gridData
    };
}

export const parseSelectOptions = (response :unknown) :IHomepageManagerSelectOptions => {
    const data = safelyParseOr(response, 'data', parseAsObject, {} as unknown);

    return {
        focuses: safelyParseOr(data, 'focuses', parseAsStringArray, [] as string[]),
        jobs: safelyParseOr(data, 'jobs', parseAsStringArray, [] as string[])
    }
}