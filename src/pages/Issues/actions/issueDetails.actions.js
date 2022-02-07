import {
  ISSUE_DETAILS_RESET,
  ISSUE_DETAILS_FETCH_IN_PROGRESS,
  ISSUE_DETAILS_FETCH_SUCCESS,
  ISSUE_DETAILS_FETCH_ERROR,
} from '../action-types/issueDetails.action-types';

export const issueDetailsFetchInProgressAction = () => ({
  type: ISSUE_DETAILS_FETCH_IN_PROGRESS,
});

export const issueDetailsFetchSuccesAction = (issueDetails) => ({
  type: ISSUE_DETAILS_FETCH_SUCCESS,
  payload: issueDetails,
});

export const issueDetailsFetchErrorAction = (error) => ({
  type: ISSUE_DETAILS_FETCH_ERROR,
  payload: error,
});

export const issueDetailsReset = () => ({
  type: ISSUE_DETAILS_RESET,
});
