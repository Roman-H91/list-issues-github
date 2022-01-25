import { StyledIssueItem } from './styled';

function IssueItem({ title, labels, assignee, comments }) {
  return (
    <StyledIssueItem>
      <div>Title: {title}</div>
      <div>
        Label:{' '}
        {labels?.length > 0
          ? labels.map((label) => <span key={label.id}>{label.name}</span>)
          : 'None'}
      </div>
      <div>
        Assignee: {assignee?.login ? <span>{assignee.login}</span> : 'None'}
      </div>
      <div>Comments: {comments}</div>
    </StyledIssueItem>
  );
}

export default IssueItem;
