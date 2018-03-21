import React from 'react';
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo';
import Footer from './Footer';

const App = ({params}) => (
    <div>
        <AddTodo/>
        <VisibleTodoList
           filter={params.filter || 'all'}
        />
        <Footer/>
    </div>
);
export default App;