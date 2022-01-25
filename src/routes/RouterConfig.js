import Issues from '../pages/Issues';
import IssueDetails from '../pages/Issues/IssueList/IssueItem/IssueDetails';
import NoMatch from '../pages/NoMatch';

export const RouterConfig = [
  {
    path: '/',
    component: Issues,
  },
  {
    path: '/issue/:id',
    component: IssueDetails,
  },
  {
    path: '*',
    component: NoMatch,
  },
];
