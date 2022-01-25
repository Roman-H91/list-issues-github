import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { StyledIssueDetails } from './styled';
import { Button } from 'antd';
import { Spin, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faQuestionCircle,
  faTag,
  faUser,
  faInfo,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

function IssueDetails() {
  const { user, repo, issues, number } = useParams();
  const [issueDetails, setIssueDetails] = React.useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  React.useEffect(() => {
    getIssueDetails();
  }, []);

  function getIssueDetails() {
    setLoading(true);
    axios
      .get(`https://api.github.com/repos/${user}/${repo}/${issues}/${number}`)
      .then((response) => {
        const issueDetails = response.data;
        setIssueDetails(issueDetails);
        setLoading(false);
      })
      .catch((error) => {
        message.error(`${error.message}. Please try another repository`);
        setLoading(false);
      });
  }

  function handleClick() {
    history.goBack();
  }

  return (
    <div>
      <h1>Issue details:</h1>
      <StyledIssueDetails>
        <div>
          <FontAwesomeIcon icon={faComment} /> {issueDetails.title}
        </div>
        <div>
          <FontAwesomeIcon icon={faQuestionCircle} /> {issueDetails.state}
        </div>
        <div>
          <FontAwesomeIcon icon={faTag} />{' '}
          {issueDetails.labels?.length > 0
            ? issueDetails.labels.map((label) => (
                <span key={label.id}>{label.name}</span>
              ))
            : 'none'}
        </div>
        <div>
          <div>{loading && <Spin color='warning' size='lg' children='' />}</div>
          <FontAwesomeIcon icon={faUser} />{' '}
          {issueDetails.assignee?.login ? (
            <span>{issueDetails.assignee.login}</span>
          ) : (
            'none'
          )}
        </div>
        <div>
          <FontAwesomeIcon icon={faInfo} /> {issueDetails.comments}
        </div>
        <div>
          <FontAwesomeIcon icon={faFileAlt} />{' '}
          {issueDetails.body?.substring(0, 500)}
        </div>
        <Button type='primary' onClick={handleClick}>
          Go Back
        </Button>
      </StyledIssueDetails>
    </div>
  );
}

export default IssueDetails;
