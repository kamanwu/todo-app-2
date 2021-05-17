import React from 'react'
import { useDispatch } from 'react-redux';
import TodoInputForm from '../components/TodoInputForm'
import { addTodo } from '../reducers/todos'

const TodoInput = () => {
    const dispatch = useDispatch();

    const handleSubmitTodo = (todo) => {
        fetch(`${window.apiHost}/todo/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        })
            .then(res => res.json())
            .then((data) => {
                todo.id = data.id;
                todo.tasks = [];
                dispatch(addTodo(todo));
            });
    }

    return (
        <div className="header">
            <TodoInputForm
                onSubmit={handleSubmitTodo}
            />
        </div>
    );
};

export default TodoInput;