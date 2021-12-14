import React, { useState } from 'react';

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    const [task, setTask] = useState([]);
    return (
        <TaskContext.Provider value={[task, setTask]}>
            {props.children}
        </TaskContext.Provider>
    )
}