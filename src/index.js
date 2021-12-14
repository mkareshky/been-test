import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TaskProvider } from './TaskContext';

ReactDOM.render(
  <TaskProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TaskProvider>,
  document.getElementById('root')
);
