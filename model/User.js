const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    name:'String',
    email:'String',
    password:'String',
    googleId:'String',
})
userSchema.plugin(findOrCreate);
const User = mongoose.model('User',userSchema);

module.exports = User;