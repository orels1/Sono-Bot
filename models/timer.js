const mongoose = require('mongoose');

let TimerSchema = new mongoose.Schema({
    'text': String,
    'frequencyTime': {'type': 'Number', 'default': 20},
    'frequencyLines': {'type': 'Number', 'default': 20},
    'created': {'type': Date, 'defualt': Date.now()},
});

module.exports = mongoose.model('Timer', TimerSchema);
