import {ITeam} from "../interfaces/TeamsList";
import {parseAsArray, parseAsNumber, parseAsString, safelyParseOr} from "./common";

export default function parseTeams(apiResponse: unknown): ITeam[] {
    const teams = safelyParseOr(apiResponse, 'data', parseAsArray, [] as unknown[]);

    return teams.map(team => {
        return {
            created_at: safelyParseOr(team, 'created_at', parseAsString, ''),
            id: safelyParseOr(team, 'id', parseAsNumber, 0),
            name: safelyParseOr(team, 'name', parseAsString, 'No name'),
            updated_at: safelyParseOr(team, 'updated_at', parseAsString, ''),
            users_count: safelyParseOr(team, 'users_count', parseAsNumber, 0)
        };
    });
}
