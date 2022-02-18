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

const initialState = {
  loading: false,
  issues: [],
  filterIssues: [],
  error: '',
};

export const issuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISSUES_FETCH_IN_PROGRESS: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case ISSUES_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        issues: action.payload,
        filterIssues: action.payload,
      };
    }
    case ISSUES_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ISSUES_SORT_BY_OLDEST: {
      return {
        ...state,
        filterIssues: [...state.filterIssues].sort(function (a, b) {
          return new Date(a.created_at) - new Date(b.created_at);
        }),
      };
    }
    case ISSUES_SORT_BY_NEWEST: {
      return {
        ...state,
        filterIssues: [...state.filterIssues].sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        }),
      };
    }
    case ISSUES_FILTER_BY_LABEL: {
      return {
        ...state,
        filterIssues: state.filterIssues.filter((issue) => issue.labels.length),
      };
    }
    case ISSUES_FILTER_BY_ASSIGNEE: {
      return {
        ...state,
        filterIssues: state.filterIssues.filter(
          (issue) => issue.assignee?.login
        ),
      };
    }
    case ISSUES_FILTER_RESET: {
      return {
        ...state,
        filterIssues: state.issues,
      };
    }
    default:
      return state;
  }
};
