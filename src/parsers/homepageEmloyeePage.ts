import {parseAsArray, parseAsNumber, parseAsObject, parseAsString, safelyParseOr, parseUser} from "./common";
import {IAttributes} from "../interfaces/user";
import {IFeedItems} from "../interfaces/HomepageEmployee";

const parseAttributes = (attributes :unknown) :IAttributes => {
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

const parseHomepageEmployeeResponse = (response :unknown) :IFeedItems => {
    const responseData = safelyParseOr(response, 'data', parseAsObject, {} as unknown);
    const arrayToParse = safelyParseOr(responseData, 'data', parseAsArray, [] as unknown[]);

    return {
        data: arrayToParse.map(item => {
                const author = safelyParseOr(item, 'author', parseAsObject, {} as unknown);
                const user = safelyParseOr(item, 'user', parseAsObject, {} as unknown);
                const attributes = safelyParseOr(item, 'attributes', parseAsObject, {} as unknown);
                return {
                    attributes: parseAttributes(attributes),
                    author: parseUser(author),
                    author_id: safelyParseOr(item, 'author_id', parseAsNumber, 0),
                    created_at: safelyParseOr(item, 'created_at', parseAsString, ''),
                    id: safelyParseOr(item, 'id', parseAsNumber, 0),
                    rating: safelyParseOr(item, 'rating', parseAsNumber, 0),
                    updated_at: safelyParseOr(item, 'updated_at', parseAsString, ''),
                    user_id: safelyParseOr(item, 'user_id', parseAsNumber, 0),
                    user: parseUser(user)
                }
            }
        )
    }
}

export default parseHomepageEmployeeResponse;