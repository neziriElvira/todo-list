import React from 'react';



const TodoItems = ({ todos, removeTask }) => {

    return (
        <ul className="task-list">
            {todos.map(task => (<li key={task.id} onClick={() => removeTask(task.id)}>{task.name}</li>))}
        </ul>
    );
}

export default TodoItems;