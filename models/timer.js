const mongoose = require('mongoose');

let TimerSchema = new mongoose.Schema({
    'name': String,
    'text': String,
    'frequencyTime': {'type': 'Number', 'default': 20},
    'frequencyLines': {'type': 'Number', 'default': 20},
    'created': {'type': Date, 'defualt': Date.now()},
    'active': {'type': Boolean, 'default': false},
});

module.exports = mongoose.model('Timer', TimerSchema);
