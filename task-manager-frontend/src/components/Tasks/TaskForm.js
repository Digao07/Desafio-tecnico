import React, { useState } from 'react';
import api from '../../api/api';

const TaskForm = ({ onTaskAdded }) => { // Recebe a função onTaskAdded como prop
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/tasks', { title, description, completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Chama a função onTaskAdded para atualizar a lista de tarefas
      onTaskAdded(response.data);

      // Limpa o formulário
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Nova Tarefa</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
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
        Completa
      </label>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
