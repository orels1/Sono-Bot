import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';

// You can read more here: https://github.com/reactjs/react-router

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='*' component={Home} />
    </Route>
);
