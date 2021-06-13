import {combineReducers} from 'redux';
import teamsListPageReducer from './teamsListPage';
import loginPageReducer from "./loginPage";
import homepageEmployeeReducer from "./homepageEmployee";
import homepageManagerReducer from "./homepageManager";
import feedbackReducer from "./feedback";
import createTeamReducer from "./createTeam";

const rootReducer = combineReducers({
    teamsListPage: teamsListPageReducer,
    loginPage: loginPageReducer,
    homepageEmployee: homepageEmployeeReducer,
    homepageManager: homepageManagerReducer,
    feedback: feedbackReducer,
    createTeam: createTeamReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
