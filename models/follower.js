const mongoose = require('mongoose');

let FollowerSchema = new mongoose.Schema({
    'name': String,
    'joindate': {'type': Date, 'defualt': Date.now()},
});

module.exports = mongoose.model('Follower', FollowerSchema);
