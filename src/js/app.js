/*global window */

import React from 'react';
import Gallery from 'react-photo-gallery';
import ReactDOM from 'react-dom';

// Old Way
window.ReactDOM = ReactDOM;
window.React = React;
window.Gallery = Gallery;

if (window.scriptLoaded) {
    window.scriptLoaded();
}

// New Way
import Page from './components/Page';

ReactDOM.render(<Page />, document.getElementById("app"));

