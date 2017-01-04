import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

// You can read more here: https://github.com/reactjs/react-router

export default (
    <Route component={App}>
        <Route path="/" component={Dashboard} />
        <Route path="/settings/" component={Settings} />
        <Route path="*" component={Dashboard} />
    </Route>
);
