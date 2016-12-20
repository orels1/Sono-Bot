import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import routes from './routes';

// This one is pure service module. It injects our markup into the page, shouldn't be changed

let history = createHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
