import {
    parseAsObject,
    safelyParseOr,
    parseAsStringArray
} from "./common";
import {IHomepageManagerSelectOptions} from "../interfaces/HomepageManager";

const parseSelectOptions = (response :unknown) :IHomepageManagerSelectOptions => {
    const data = safelyParseOr(response, 'data', parseAsObject, {} as unknown);

    return {
        focuses: safelyParseOr(data, 'focuses', parseAsStringArray, [] as string[]),
        jobs: safelyParseOr(data, 'jobs', parseAsStringArray, [] as string[])
    }
}

export default parseSelectOptions;