import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux'
import configureStore from './configureStore';
import Root from './components/Root';




const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};

const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),

    }
};
const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);




const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('root')
);

