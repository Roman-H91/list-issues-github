import {
  ISSUE_DETAILS_RESET,
  ISSUE_DETAILS_FETCH_IN_PROGRESS,
  ISSUE_DETAILS_FETCH_SUCCESS,
  ISSUE_DETAILS_FETCH_ERROR,
} from '../action-types/issueDetails.action-types';

const initialState = {
  loading: false,
  issueDetails: '',
  error: '',
};

export const issueDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISSUE_DETAILS_FETCH_IN_PROGRESS: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case ISSUE_DETAILS_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        issueDetails: action.payload,
      };
    }
    case ISSUE_DETAILS_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ISSUE_DETAILS_RESET: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
