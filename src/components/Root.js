import React from 'react'
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import PropTypes from "prop-types";

const Root =({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter?" component={App}/>
        </BrowserRouter>
    </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;