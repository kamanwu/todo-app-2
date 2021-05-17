import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoInput from '../containers/TodoInput'
import TodoList from '../containers/TodoList'
import { initTodos } from '../reducers/todos';

const TodoApp = () => {
    const { todos } = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        async function _loadTodos() {
            let res = await fetch(`${window.apiHost}/todo/todo`)
            let todos = await res.json();

            todos = todos.sort((a, b) => { return b.id - a.id });
            for (const [i, todo] of todos.entries()) {
                let res = await fetch(`${window.apiHost}/todo/todo/?id=${todo.id}`)
                let tmp = await res.json();
                todos[i] = tmp;
            }
            dispatch(initTodos(todos));
        }
        _loadTodos();
    }, [])

    return (
        <div className='todoListMain'>
            <TodoInput />
            <TodoList />
        </div>
    );
};

export default TodoApp;