import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouterConfig } from './RouterConfig';

function AppRouter() {
  return (
    <Switch>
      {RouterConfig.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}
    </Switch>
  );
}

export default AppRouter;
