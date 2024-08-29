import React, { useEffect, useState, useContext } from 'react';
import api from '../../api/api';
import LogoutButton from '../Auth/LogoutButton';
import { AuthContext } from '../../contexts/AuthContext';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

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

    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleCompleted = async (taskId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/tasks/${taskId}`, { completed: !currentStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      ));
    } catch (error) {
      console.error('Erro ao marcar tarefa como concluída:', error.response?.data || error.message);
      alert(`Erro ao marcar tarefa como concluída: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (task) => {
    setIsEditing(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/tasks/${taskId}`, { title: editedTitle, description: editedDescription }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, title: editedTitle, description: editedDescription } : task
      ));
      setIsEditing(null);
    } catch (error) {
      console.error('Erro ao editar tarefa:', error.response?.data || error.message);
      alert(`Erro ao editar tarefa: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.response?.data || error.message);
      alert(`Erro ao excluir tarefa: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <LogoutButton />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {isEditing === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Salvar</button>
                <button onClick={() => setIsEditing(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task.id, task.completed)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => handleDelete(task.id)}>Excluir</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
