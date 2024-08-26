const express = require('express');
const Task = require('../models/Task');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// Listar Tarefas
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas', error });
  }
});

// Adicionar Tarefa
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar tarefa', error });
  }
});

// Editar Tarefa
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (task && task.userId === req.user.id) {
      task.title = title;
      task.description = description;
      task.completed = completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar tarefa', error });
  }
});

// Excluir Tarefa
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task && task.userId === req.user.id) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa', error });
  }
});

module.exports = router;
