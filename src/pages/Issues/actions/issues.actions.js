import {
  ISSUES_FETCH_IN_PROGRESS,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_ERROR,
  ISSUES_SORT_BY_OLDEST,
  ISSUES_SORT_BY_NEWEST,
  ISSUES_FILTER_BY_LABEL,
  ISSUES_FILTER_BY_ASSIGNEE,
  ISSUES_FILTER_RESET,
} from '../action-types/issues.action-types';

export const issuesFetchInProgressAction = () => ({
  type: ISSUES_FETCH_IN_PROGRESS,
});

export const issuesFetchSuccessAction = (issues) => ({
  type: ISSUES_FETCH_SUCCESS,
  payload: issues,
});

export const issuesFetchErrorAction = (error) => ({
  type: ISSUES_FETCH_ERROR,
  payload: error,
});

export const issuesSortByOldestAction = () => ({
  type: ISSUES_SORT_BY_OLDEST,
});

export const issuesSortByNewestAction = () => ({
  type: ISSUES_SORT_BY_NEWEST,
});

export const issuesFilterByLabelAction = () => ({
  type: ISSUES_FILTER_BY_LABEL,
});

export const issuesFilterByAssignee = () => ({
  type: ISSUES_FILTER_BY_ASSIGNEE,
});

export const issuesFilterReset = () => ({
  type: ISSUES_FILTER_RESET,
});
