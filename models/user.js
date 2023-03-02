const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    //timestamp will show when is page created and updated
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;  