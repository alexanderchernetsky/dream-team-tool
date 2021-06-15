export interface ISocialLink {
  link: string;
  name: string;
  profile_name: string;
}

interface IProfile {
  created_at: string;
  focus: string;
  id: number;
  job_title: string;
  rating: number;
  short_description: string;
  social_links?: ISocialLink[];
  updated_at?: string;
  user_id?: number;
}

interface IRole {
  created_at: string;
  id: number;
  name: string;
  pivot: {
    role_id: number;
    user_id: number;
  };
}

export interface IUser {
  age: number;
  created_at: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  first_work_date: string;
  full_name: string;
  id: number;
  image: string | undefined;
  image_src: string | undefined;
  last_name: string;
  remember_token: string | undefined;
  years_of_experience: number;
  profile: IProfile;
  is_manager?: boolean;
  roles?: IRole[];
  job_title?: string;
  rating?: string;
  focus?: string;
}

export interface IAttributes {
  communication_explainsIdeasInSpokenLanguage: string;
  communication_explainsWrittenIdeas: string;
  communication_listensAndClarifiesInformation: string;
  communication_openAndAvailableForCommunication: string;
  communication_respectAndTactfulInCommunication: string;
  effectiveness_findsEffectiveSolutionsToSimplifyWork: string;
  effectiveness_goodInMultitasking: string;
  effectiveness_meetsDeadlines: string;
  effectiveness_showsDiligenceInDayToDayWork: string;
  effectiveness_worksWithoutMistakes: string;
  independence_ableToTakeResponsibilityForMistakes: string;
  independence_adequatelyEvaluateSkillsAndAbilities: string;
  independence_independentWork: string;
  independence_independentWorkWithDifficulties: string;
  independence_responsibleForResultsOfHisWork: string;
  interpersonalQualities_openForNewIdeas: string;
  interpersonalQualities_providesHonestReviews: string;
  interpersonalQualities_stressResistance: string;
  interpersonalQualities_takesIntoConsiderationOtherPointsOfView: string;
  interpersonalQualities_understandingOfOtherPointsOfView: string;
  otherComments: string;
  strongPersonalCharacteristics: string;
  weakSides: string;
  workExperienceWithAnEmployee: string;
  workInTeam_involvedInWork: string;
  workInTeam_perceiveConstructiveCriticism: string;
  workInTeam_takesInitiative: string;
  workInTeam_teamworkToSolveProblems: string;
  workInTeam_trustworthyTeamMember: string;
}

interface IStatistic {
  negative: number;
  positive: number;
  neutral: number;
}

interface IReview {
  attributes: IAttributes;
  author_id: number;
  created_at: string;
  id: number;
  rating: number;
  updated_at: string;
  user_id: number;
}

export interface HomepageEmployeeUser {
  attributes: IAttributes;
  author: IUser;
  author_id: number;
  created_at: string;
  id: number;
  rating: number;
  updated_at: string;
  user_id: number;
  user: IUser;
}

export interface TeamAnalisysUser {
  statistic: IStatistic;
  user: IUser & IReview[];
}

export interface GridDataUser {
  focus?: string;
  full_name: string;
  id: number;
  job_title?: string;
  key: number;
  rating?: number | string;
  user?: string;
}

export type UserId = string | number;
