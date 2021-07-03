import {
    safelyParseOr,
    parseAsArray,
    parseAsString
} from "./common";
import {IHomepageManagerSelectOptions} from "../interfaces/HomepageManager";

const parseSelectOptions = (response :unknown) :IHomepageManagerSelectOptions => {
    const focuses = safelyParseOr(response, 'data.focuses', parseAsArray, [] as unknown[]);
    const jobs  = safelyParseOr(response, 'data.jobs', parseAsArray, [] as unknown[])

    return {
        focuses: focuses.map((focus: unknown, index :number) => safelyParseOr(focuses, `${index}`, parseAsString, "")),
        jobs: jobs.map((job: unknown, index :number) => safelyParseOr(jobs, `${index}`, parseAsString, "")),
    }
}

export default parseSelectOptions;