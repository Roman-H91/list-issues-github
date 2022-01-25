import React, { useState } from 'react';
import axios from 'axios';
import { StyledIssueList } from './styled';
import IssueItem from './IssueItem/';
import { Spin, message, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function IssueList() {
  const [repoValue, setRepoValue] = useState('');
  const [issues, setIssues] = useState('');
  const [loading, setLoading] = useState(false);

  function getIssues(repo) {
    setLoading(true);
    axios
      .get(`https://api.github.com/repos/${repo}/issues?state=all`)
      .then((response) => {
        const issues = response.data;
        setIssues(issues);
        setLoading(false);
      })
      .catch((error) => {
        message.error(`${error.message}. Please try another repository`);
        setLoading(false);
      });
  }

  function sortByOldest() {
    const result = [...issues].sort(function (a, b) {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    setIssues(result);
  }
  function sortByNewest() {
    const result = [...issues].sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setIssues(result);
  }

  function filterByLabel() {
    let result = issues.filter((issue) => issue.labels.length);
    setIssues(result);
  }

  function filterByAssignee() {
    let result = issues.filter((issue) => issue.assignee?.login);
    setIssues(result);
  }

  function handleChange(event) {
    setRepoValue(event.target.value);
  }

  function handleSubmit(event) {
    getIssues(repoValue);
    event.preventDefault();
  }

  return (
    <div>
      <h1>Github list of issues:</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: '25px' }}>
        <label htmlFor='issueInput'>
          Enter user and repository (e.g.: 'microsoft/typescript'):
        </label>
        <br />
        <Input
          style={{ width: '220px', marginRight: '5px' }}
          size='medium'
          name='issueInput'
          id='issueInput'
          type='text'
          value={repoValue}
          onChange={handleChange}
        />
        <Button
          htmlType='submit'
          type='primary'
          shape='circle'
          size='large'
          icon={<SearchOutlined />}
        />
      </form>

      <div style={{ marginTop: '25px' }}>
        <Button size='small' onClick={() => sortByOldest()}>
          Sort by oldest
        </Button>
        <Button size='small' onClick={() => sortByNewest()}>
          Sort by newest
        </Button>
        <Button size='small' onClick={() => filterByLabel()}>
          Filter by label
        </Button>
        <Button size='small' onClick={() => filterByAssignee()}>
          Filter by assignee
        </Button>
      </div>

      <div>{loading && <Spin color='warning' size='lg' children='' />}</div>

      {issues.length > 0 && (
        <StyledIssueList>
          {issues.map((issue) => (
            <IssueItem
              key={issue.id}
              id={issue.id}
              issueUrl={issue.url}
              title={issue.title}
              labels={issue.labels}
              assignee={issue.assignee}
              comments={issue.comments}
            />
          ))}
        </StyledIssueList>
      )}
    </div>
  );
}

export default IssueList;
