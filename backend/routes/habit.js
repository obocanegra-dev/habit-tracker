const express = require('express');
const Habit = require('../models/Habit');
const User = require('../models/User');

const router = express.Router();

// Agregar un nuevo hábito
router.post('/', async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario desde el token

    try {
        const newHabit = new Habit({ userId, name, completed: [] });
        await newHabit.save();
        res.status(201).send(newHabit);
    } catch (error) {
        res.status(500).send({ message: 'Error adding habit' });
    }
});

// Obtener hábitos del usuario
router.get('/', async (req, res) => {
    const userId = req.user.id;

    try {
        const habits = await Habit.find({ userId });
        res.send(habits);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching habits' });
    }
});

// Marcar hábito como completado
router.post('/:id/complete', async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const date = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    try {
        const habit = await Habit.findOne({ _id: id, userId });
        if (!habit) {
            return res.status(404).send({ message: 'Habit not found' });
        }

        habit.completed.push({ date, status: true });
        await habit.save();
        res.send(habit);
    } catch (error) {
        res.status(500).send({ message: 'Error marking habit' });
    }
});

module.exports = router;