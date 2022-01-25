import React from 'react';
import { StyledIssueList } from './styled';
import IssueItem from './IssueItem/';

function IssueList() {
  const [issueValue, setIssueValue] = React.useState('');
  const [issues, setIssues] = React.useState('');
  console.log(issues);

  async function getIssues(repo) {
    const response = await fetch(`https://api.github.com/repos/${repo}/issues`);
    const issues = await response.json();
    setIssues(issues);
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
    setIssueValue(event.target.value);
  }

  function handleSubmit(event) {
    getIssues(issueValue);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='issueInput'>
          Enter user and repository (e.g.: 'microsoft/typescript'):
        </label>
        <br />
        <input
          name='issueInput'
          id='issueInput'
          type='text'
          value={issueValue}
          onChange={handleChange}
        />
        <button type='submit'>Get info</button>
      </form>

      <button onClick={() => sortByOldest()}>Sort by oldest</button>
      <button onClick={() => sortByNewest()}>Sort by newest</button>
      <button onClick={() => filterByLabel()}>Filter by label</button>
      <button onClick={() => filterByAssignee()}>Filter by assignee</button>

      {issues.length > 0 && (
        <StyledIssueList>
          {issues.map((issue) => (
            <IssueItem
              key={issue.id}
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
