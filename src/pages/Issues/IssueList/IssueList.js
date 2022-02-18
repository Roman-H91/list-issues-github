import React, { useState } from 'react';
import axios from 'axios';
import { StyledIssueList } from './styled';
import IssueItem from './IssueItem/';
import { message, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  issuesFetchInProgressAction,
  issuesFetchSuccessAction,
  issuesFetchErrorAction,
  issuesSortByOldestAction,
  issuesSortByNewestAction,
  issuesFilterByLabelAction,
  issuesFilterByAssignee,
  issuesFilterReset,
} from '../actions/issues.actions';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  user: '',
  repo: '',
};

function IssueList() {
  const [values, setValues] = useState(initialValues);
  const { issues, filterIssues, loading } = useSelector(
    (state) => state.issuesReducer
  );

  const dispatch = useDispatch();

  function getIssues() {
    dispatch(issuesFetchInProgressAction());
    axios
      .get(
        `https://api.github.com/repos/${values.user}/${values.repo}/issues?state=all`
      )
      .then((response) => {
        const issues = response.data;
        dispatch(issuesFetchSuccessAction(issues));
      })
      .catch((error) => {
        dispatch(issuesFetchErrorAction(error));
        message.error(`${error.message}. Please try another repository`);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    getIssues(values);

    setValues({
      user: '',
      repo: '',
    });
  }

  return (
    <div>
      <h1>Github list of issues:</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: '25px' }}>
        <div>
          <div>
            <label htmlFor='user'>User (e.g.: 'microsoft'): </label>
            <br />
            <Input
              style={{ width: '250px' }}
              size='medium'
              name='user'
              id='user'
              type='text'
              value={values.user}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <label htmlFor='repo'>Repo (e.g.: 'typescript'): </label>
            <br />
            <Input
              style={{ width: '250px' }}
              size='medium'
              name='repo'
              id='repo'
              type='text'
              value={values.repo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button
          htmlType='submit'
          type='primary'
          shape='round'
          size='large'
          icon={<SearchOutlined />}
          loading={loading}
          style={{ marginTop: '5px' }}
        />
      </form>

      {issues.length > 0 && (
        <div style={{ marginTop: '25px' }}>
          <Button
            size='small'
            onClick={() => dispatch(issuesFilterReset())}
            style={{ background: '#90ee90 ' }}
          >
            Reset
          </Button>
          <Button
            size='small'
            onClick={() => dispatch(issuesSortByOldestAction())}
            style={{ background: '#000000', color: '#fff' }}
          >
            Sort by oldest
          </Button>
          <Button
            size='small'
            onClick={() => dispatch(issuesSortByNewestAction())}
            style={{ background: '#000000', color: '#fff' }}
          >
            Sort by newest
          </Button>
          <Button
            size='small'
            onClick={() => dispatch(issuesFilterByLabelAction())}
            style={{ background: '#000000', color: '#fff' }}
          >
            Filter by label
          </Button>
          <Button
            size='small'
            onClick={() => dispatch(issuesFilterByAssignee())}
            style={{ background: '#000000', color: '#fff' }}
          >
            Filter by assignee
          </Button>
        </div>
      )}

      {filterIssues.length > 0 && (
        <StyledIssueList>
          {filterIssues.map((issue) => (
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
