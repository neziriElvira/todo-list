import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItems from "./TodoItems";


const TodoList = () => {

    const [name, setName] = useState('');
    const [todos, setTodos] = useLocalStorage('todos', []);

    function useLocalStorage(key, initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.log(error);
                return initialValue;
            }
        });
        const setValue = (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.log(error);
            }


        };
        return [storedValue, setValue];
    }

    function addTask(name) {
        setTodos([...todos, { name, id: uuidv4() }]);
    }

    function removeTask(id) {
        setTodos(todos.filter(task => task.id !== id));
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addTask(name);
        setName('');
    }

    return (
        <div className="main">
            <div className="header">
                <h2>TODO LIST</h2>
                <p>Write your tasks down below</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='text'
                    value={name}
                    placeholder='enter task'
                    onChange={handleChange}
                    required
                />
                <button type='submit'>add</button>
            </form>
            <TodoItems todos={todos} removeTask={removeTask} />
        </div>
    );
}

export default TodoList;