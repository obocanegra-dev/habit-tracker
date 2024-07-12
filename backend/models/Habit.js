const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    completed: [{ date: { type: Date }, status: { type: Boolean } }]
}, { timestamps: true });

module.exports = mongoose.model('Habit', HabitSchema);