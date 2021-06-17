import {IAttributes, IProfile, IRole, IUser} from "../interfaces/user";

export interface ITypeGuard<T> {
    (value: unknown): value is T;
}

export function isString(candidate: unknown): candidate is string {
    return typeof candidate === 'string';
}

export function isNumber(candidate: unknown): candidate is number {
    return typeof candidate === 'number';
}

export function isBoolean(candidate: unknown): candidate is boolean {
    return typeof candidate === 'boolean';
}

export function isArray(candidate: unknown): candidate is unknown[] {
    return Array.isArray(candidate);
}

export function isStringArray(candidate: unknown): candidate is string[] {
    let stringArray :unknown[] = [];
    if(isArray(candidate)) {
        stringArray = candidate.filter((item :unknown) => typeof item === "string")
    }
    return Array.isArray(candidate) && stringArray.length === candidate.length;
}

export function isObject(candidate: unknown): candidate is object {
    return typeof candidate === 'object';
}

export function isNotUndefined<T>(candidate: T | undefined): candidate is T {
    return candidate !== undefined;
}

export function isNotNullOrUndefined<T>(candidate: T | undefined | null): candidate is T {
    return candidate !== undefined && candidate !== null;
}

export function isEnumMember<E>(enumToTest: E): ITypeGuard<E[keyof E]> {
    return (candidate: unknown): candidate is E[keyof E] => {
        const members = Object.values(enumToTest);

        return members.includes(candidate);
    };
}

export interface IParser<T> {
    <F>(value: unknown, fallbackValue: F, property?: string, logError?: boolean): T | F;
}

export function safelyParseOr<T, F>(data: unknown, property: string, parse: IParser<T>, fallback: F, logErrorOnUndefined: boolean = true): T | F {
    const [first, ...chainedProperties] = property.split('.');
    if (typeof data === 'object' && data !== null && data.hasOwnProperty(first)) {
        // @ts-ignore
        const value = data[first];

        // this if statement allows for chaining property parsing via dot notation. (i.e. 'firstProp.chainedProp.anotherChainedProp')
        if (chainedProperties.length) {
            return safelyParseOr(value, chainedProperties.join('.'), parse, fallback, logErrorOnUndefined);
        }

        return parse(value, fallback, property, logErrorOnUndefined);
    }
        if (logErrorOnUndefined && !(typeof data === 'object' && data !== null)) {
            const error = new Error(`Parser: Cannot access ${property} of ${data}. Returning ${fallback}`);
            // eslint-disable-next-line no-console
            console.log(error);
            // eslint-disable-next-line no-console
            console.log(data);
        }

        return fallback;
    
}

export function parseAsType<T>(isExpectedType: ITypeGuard<T>): IParser<T> {
    return (value, fallback, property, logError = true) => {
        if (isExpectedType(value)) {
            return value;
        } 
            // This prevents the errors: `PreviewStream: null is not of expected type. Returning `, when the parser expects a string, but the
            // fallback is null, meaning it's actually nullable.
            const hasError = logError && value && fallback;

            if (hasError) {
                const error = new Error(`Parser: ${property || 'unknown'}: ${value} is not of expected type. Returning ${fallback}`);

                // eslint-disable-next-line no-console
                console.log(error.message, error);
            }

            return fallback;
        
    };
}

export const parseAsString = parseAsType(isString);
export const parseAsNumber = parseAsType(isNumber);
export const parseAsBoolean = parseAsType(isBoolean);
export const parseAsArray = parseAsType(isArray);
export const parseAsObject = parseAsType(isObject);
export const parseAsStringArray = parseAsType(isStringArray);

export const parseProfile = (profile :unknown) :IProfile => {
    const socialLinks = safelyParseOr(profile, 'social_links', parseAsArray, [] as unknown[]);
    return {
        created_at: safelyParseOr(profile, 'created_at', parseAsString, ''),
        focus: safelyParseOr(profile, 'focus', parseAsString, ''),
        id: safelyParseOr(profile, 'id', parseAsNumber, 0),
        job_title: safelyParseOr(profile, 'job_title', parseAsString, ''),
        rating: safelyParseOr(profile, 'rating', parseAsNumber, 0),
        short_description: safelyParseOr(profile, 'short_description', parseAsString, ''),
        updated_at: safelyParseOr(profile, 'updated_at', parseAsString, ''),
        user_id: safelyParseOr(profile, 'user_id', parseAsNumber, 0),
        social_links: socialLinks.map(link => ({
            link: safelyParseOr(link, 'link', parseAsString, ''),
            name: safelyParseOr(link, 'name', parseAsString, ''),
            profile_name: safelyParseOr(link, 'profile_name', parseAsString, ''),
        }))
    }
}

const parseRoles = (roles: unknown[]) :IRole[] => {
    return roles.map(role => {
        const pivot = safelyParseOr(role, 'pivot', parseAsObject, {} as unknown);
        return {
            created_at: safelyParseOr(role, 'created_at', parseAsString, ''),
            id: safelyParseOr(role, 'id', parseAsNumber, 0),
            name: safelyParseOr(role, 'name', parseAsString, ''),
            pivot: {
                role_id: safelyParseOr(pivot, 'role_id', parseAsNumber, 0),
                user_id: safelyParseOr(pivot, 'user_id', parseAsNumber, 0),
            }
        }
    });
};

export const parseUser = (user: unknown) :IUser => {
    const roles = safelyParseOr(user, 'roles', parseAsArray, [] as unknown[]);
    const profile = safelyParseOr(user, 'profile', parseAsObject, {} as unknown[]);
    return {
        age: safelyParseOr(user, 'age', parseAsNumber, 0),
        created_at: safelyParseOr(user, 'created_at', parseAsString, ''),
        date_of_birth: safelyParseOr(user, 'date_of_birth', parseAsString, ''),
        email: safelyParseOr(user, 'email', parseAsString, ''),
        first_name: safelyParseOr(user, 'first_name', parseAsString, ''),
        first_work_date: safelyParseOr(user, 'first_work_date', parseAsString, ''),
        full_name: safelyParseOr(user, 'full_name', parseAsString, ''),
        id: safelyParseOr(user, 'id', parseAsNumber, 0),
        image: safelyParseOr(user, 'image', parseAsString, undefined),
        image_src: safelyParseOr(user, 'image_src', parseAsString, ''),
        is_manager: safelyParseOr(user, 'is_manager', parseAsBoolean, false),
        last_name: safelyParseOr(user, 'last_name', parseAsString, ''),
        remember_token: safelyParseOr(user, 'remember_token', parseAsString, undefined),
        years_of_experience: safelyParseOr(user, 'years_of_experience', parseAsNumber, 0),
        profile: parseProfile(profile),
        roles: parseRoles(roles),
        job_title: safelyParseOr(user, 'job_title', parseAsString, ""),
        rating: safelyParseOr(user, 'rating', parseAsNumber, undefined),
        focus: safelyParseOr(user, 'focus', parseAsString, ""),
    }
}

export const parseAttributes = (attributes :unknown) :IAttributes => {
    return {
        communication_explainsIdeasInSpokenLanguage: safelyParseOr(attributes, 'communication_explainsIdeasInSpokenLanguage', parseAsString, ''),
        communication_explainsWrittenIdeas: safelyParseOr(attributes, 'communication_explainsWrittenIdeas', parseAsString, ''),
        communication_listensAndClarifiesInformation: safelyParseOr(attributes, 'communication_listensAndClarifiesInformation', parseAsString, ''),
        communication_openAndAvailableForCommunication: safelyParseOr(attributes, 'communication_openAndAvailableForCommunication', parseAsString, ''),
        communication_respectAndTactfulInCommunication: safelyParseOr(attributes, 'communication_respectAndTactfulInCommunication', parseAsString, ''),
        effectiveness_findsEffectiveSolutionsToSimplifyWork: safelyParseOr(attributes, 'effectiveness_findsEffectiveSolutionsToSimplifyWork', parseAsString, ''),
        effectiveness_goodInMultitasking: safelyParseOr(attributes, 'effectiveness_goodInMultitasking', parseAsString, ''),
        effectiveness_meetsDeadlines: safelyParseOr(attributes, 'effectiveness_meetsDeadlines', parseAsString, ''),
        effectiveness_showsDiligenceInDayToDayWork: safelyParseOr(attributes, 'effectiveness_showsDiligenceInDayToDayWork', parseAsString, ''),
        effectiveness_worksWithoutMistakes: safelyParseOr(attributes, 'effectiveness_worksWithoutMistakes', parseAsString, ''),
        independence_ableToTakeResponsibilityForMistakes: safelyParseOr(attributes, 'independence_ableToTakeResponsibilityForMistakes', parseAsString, ''),
        independence_adequatelyEvaluateSkillsAndAbilities: safelyParseOr(attributes, 'independence_adequatelyEvaluateSkillsAndAbilities', parseAsString, ''),
        independence_independentWork: safelyParseOr(attributes, 'independence_independentWork', parseAsString, ''),
        independence_independentWorkWithDifficulties: safelyParseOr(attributes, 'independence_independentWorkWithDifficulties', parseAsString, ''),
        independence_responsibleForResultsOfHisWork: safelyParseOr(attributes, 'independence_responsibleForResultsOfHisWork', parseAsString, ''),
        interpersonalQualities_openForNewIdeas: safelyParseOr(attributes, 'interpersonalQualities_openForNewIdeas', parseAsString, ''),
        interpersonalQualities_providesHonestReviews: safelyParseOr(attributes, 'interpersonalQualities_providesHonestReviews', parseAsString, ''),
        interpersonalQualities_stressResistance: safelyParseOr(attributes, 'interpersonalQualities_stressResistance', parseAsString, ''),
        interpersonalQualities_takesIntoConsiderationOtherPointsOfView: safelyParseOr(attributes, 'interpersonalQualities_takesIntoConsiderationOtherPointsOfView', parseAsString, ''),
        interpersonalQualities_understandingOfOtherPointsOfView: safelyParseOr(attributes, 'interpersonalQualities_understandingOfOtherPointsOfView', parseAsString, ''),
        otherComments: safelyParseOr(attributes, 'otherComments', parseAsString, ''),
        strongPersonalCharacteristics: safelyParseOr(attributes, 'strongPersonalCharacteristics', parseAsString, ''),
        weakSides: safelyParseOr(attributes, 'weakSides', parseAsString, ''),
        workExperienceWithAnEmployee: safelyParseOr(attributes, 'workExperienceWithAnEmployee', parseAsString, ''),
        workInTeam_involvedInWork: safelyParseOr(attributes, 'workInTeam_involvedInWork', parseAsString, ''),
        workInTeam_perceiveConstructiveCriticism: safelyParseOr(attributes, 'workInTeam_perceiveConstructiveCriticism', parseAsString, ''),
        workInTeam_takesInitiative: safelyParseOr(attributes, 'workInTeam_takesInitiative', parseAsString, ''),
        workInTeam_teamworkToSolveProblems: safelyParseOr(attributes, 'workInTeam_teamworkToSolveProblems', parseAsString, ''),
        workInTeam_trustworthyTeamMember: safelyParseOr(attributes, 'workInTeam_trustworthyTeamMember', parseAsString, ''),
    }
}

export const parseGridData = (response :unknown) => {
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


