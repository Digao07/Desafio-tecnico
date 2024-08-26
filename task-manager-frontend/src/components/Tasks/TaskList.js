import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao listar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
