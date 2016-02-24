/*global window */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// stateless components use main React
window.React = React;

// New Way
import Page from './components/Page';
import GalleryPage from './components/GalleryPage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path={`${window.baseURL}/`} component={Page} />
        <Route path={`${window.baseURL}/list/*`} component={Page} />
        <Route path={`${window.baseURL}/gallery/*`} component={GalleryPage} />
    </Router>, document.getElementById("app"));

