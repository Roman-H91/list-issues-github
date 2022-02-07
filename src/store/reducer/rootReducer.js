import { combineReducers } from 'redux';
import { issuesReducer } from '../../pages/Issues/reducers/issuesReducer';
import { issueDetailsReducer } from '../../pages/Issues/reducers/issueDetailsReducer';

export const rootReducer = combineReducers({
  issuesReducer,
  issueDetailsReducer,
});
