import Issues from '../pages/Issues';
import IssueDetails from '../pages/Issues/IssueList/IssueItem/IssueDetails';
import NoMatch from '../pages/NoMatch';

export const RouterConfig = [
  {
    path: '/',
    component: Issues,
  },
  {
    path: '/:user/:repo/:issues/:number',
    component: IssueDetails,
  },
  {
    path: '*',
    component: NoMatch,
  },
];
