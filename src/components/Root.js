import React from 'react'
import { Provider } from 'react-redux';
import {Router, Route} from 'react-router';
import App from './App';
import PropTypes from "prop-types";

const Root =({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/(:filter)" component={App}/>
        </Router>
    </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;