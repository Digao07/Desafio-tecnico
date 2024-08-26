import React, { useState } from 'react';
import api from '../../api/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/tasks', { title, description, completed }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
