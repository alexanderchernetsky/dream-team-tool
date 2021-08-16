import {parseAsArray, parseAsNumber, safelyParseOr} from "./common";
import {parseUser} from "./parseUser";
import {IGridParsedData} from "../interfaces/common";

const parseGridData = (response :unknown) :IGridParsedData => {
    const gridDataArray = safelyParseOr(response, 'data.data', parseAsArray, [] as unknown[]);

    return {
        total: safelyParseOr(response, 'data.total', parseAsNumber, 0),
        per_page: safelyParseOr(response, 'data.per_page', parseAsNumber, 0),
        current_page: safelyParseOr(response, 'data.current_page', parseAsNumber, 0),
        data: gridDataArray.map(user => {
            return parseUser(user);
        })
    };
}

export default parseGridData;