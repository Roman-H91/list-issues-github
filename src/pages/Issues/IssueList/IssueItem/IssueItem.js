import { StyledIssueItem } from './styled';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faTag,
  faUser,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

function IssueItem({ id, title, labels, assignee, comments, issueUrl }) {
  const splitUrl = issueUrl.split(/repos/);

  return (
    <StyledIssueItem>
      <div>
        <FontAwesomeIcon icon={faComment} /> {title}
      </div>
      <div>
        <FontAwesomeIcon icon={faTag} />{' '}
        {labels?.length > 0
          ? labels.map((label) => <span key={label.id}>{label.name}</span>)
          : 'none'}
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} />{' '}
        {assignee?.login ? <span>{assignee.login}</span> : 'none'}
      </div>
      <div>
        <FontAwesomeIcon icon={faInfo} /> {comments}
      </div>
      <Link
        to={`${splitUrl[1]}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button color='primary'>Read More</Button>
      </Link>
    </StyledIssueItem>
  );
}

export default IssueItem;
