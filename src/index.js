import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducer from './reducers/index';
import TodoApp from './containers/TodoApp';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';

const store = createStore(allReducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('container')
);