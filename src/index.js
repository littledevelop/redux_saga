import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./redux/store";
import { Provider } from "react-redux";
import ScrollToTop from './ScrollToTop';

ReactDOM.render(
    <Router>
        <ScrollToTop>
            <Provider store={store}>   
                <App/>
            </Provider>
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
);
