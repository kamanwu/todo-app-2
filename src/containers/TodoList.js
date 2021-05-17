import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem'
import ModalEditTodo from '../components/ModalEditTodo'
import ModalAddTodoTask from '../components/ModalAddTodoTask'
import ModalEditTodoTask from '../components/ModalEditTodoTask'
import { deleteTodo, updateTodo, addTodoTask, editTodoTask, deleteTodoTask } from '../reducers/todos'

const TodoList = () => {
    const { todos } = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [updateTodoModalFlag, setUpdateTodoModalFlag] = useState(false);
    const [addTaskModalFlag, setAddTaskModalFlag] = useState(false);
    const [updateTaskModalFlag, setUpdateTaskModalFlag] = useState(false);
    const [modalTodoId, setModalTodoId] = useState(-1);
    const [modalTaskId, setModalTaskId] = useState(-1);

    const handleSetModalTodoId = (id, type) => {
        if (type === 'ADD_TASK') {
            setModalTodoId(id);
            setAddTaskModalFlag(true);
        }
        else if (type === 'EDIT_TODO') {
            setModalTodoId(id);
            setUpdateTodoModalFlag(true);
        }
    }

    const handleSetModalTodoTaskId = (tid, id) => {
        setModalTodoId(tid);
        setModalTaskId(id);
        setUpdateTaskModalFlag(true);
    }

    const handleClose = () => {
        setUpdateTodoModalFlag(false);
        setAddTaskModalFlag(false);
        setUpdateTaskModalFlag(false);
    }

    const handleDeleteTodo = (id) => {
        fetch(`${window.apiHost}/todo/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                dispatch(deleteTodo(id));
            });
    }

    const handleUpdateTodo = (todo) => {
        fetch(`${window.apiHost}/todo/todo/${modalTodoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        })
            .then(res => {
                dispatch(updateTodo(modalTodoId, todo));
            });
    }

    const handleAddTodoTask = (task) => {
        task.tid = modalTodoId;

        fetch(`${window.apiHost}/todo/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
            .then(res => res.json())
            .then((data) => {
                task.id = data.id
                dispatch(addTodoTask(task.tid, task));
            });
    }

    const handleDeleteTask = (tid, id) => {
        fetch(`${window.apiHost}/todo/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                dispatch(deleteTodoTask(tid, id));
            });
    }

    const handleUpdateTodoTask = (task) => {
        fetch(`${window.apiHost}/todo/task/${modalTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
            .then(res => {
                dispatch(editTodoTask(modalTodoId, modalTaskId, task));
            });
    }

    return (
        <div className="body">
            <ul className='theList'>
                {todos.map((todo) =>
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        onDeleteTodo={handleDeleteTodo}
                        onDeleteTask={handleDeleteTask}
                        onSetModalTodoId={handleSetModalTodoId}
                        onSetModalTodoTaskId={handleSetModalTodoTaskId}
                    />
                )}
            </ul>
            <ModalEditTodo
                show={updateTodoModalFlag}
                onHide={handleClose}
                onSubmit={handleUpdateTodo}
                todos={todos}
                todoId={modalTodoId}
            />
            <ModalAddTodoTask
                show={addTaskModalFlag}
                onHide={handleClose}
                onSubmit={handleAddTodoTask}
                todos={todos}
                todoId={modalTodoId}
            />
            <ModalEditTodoTask
                show={updateTaskModalFlag}
                onHide={handleClose}
                onSubmit={handleUpdateTodoTask}
                todos={todos}
                todoId={modalTodoId}
                taskId={modalTaskId}
            />
        </div>
    );
};

export default TodoList;