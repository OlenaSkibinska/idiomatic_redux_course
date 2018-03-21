import React from 'react';
import {createStore} from 'redux';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import todoApp from './reducers'
import {loadState, saveState} from './localStorage'
import TodoList from './components/TodoList'
import throttle from 'lodash/throttle';

const Link = ({
                  active,
                  children,
                  onClick
              }) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>
    );
};

const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(
            setVisibilityFilter(ownProps.filter)
        );
    }
});

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);



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



const persistedState = loadState();
const store = createStore(
    todoApp,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
}, 1000));
ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);

