import {combineReducers} from 'redux';
import teamsListPageReducer from './teamsListPage';

const rootReducer = combineReducers({
    teamsListPage: teamsListPageReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
