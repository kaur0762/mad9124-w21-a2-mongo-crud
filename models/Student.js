const Student = require('./Student')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: {type: String, trim: true, maxlength: 64, required: true},
    lastName: {type: String, trim: true, maxlength: 64, required: true},
    nickName: {type: String, trim: true, maxlength: 64, required: false},
    email: {type: String, trim: true, maxlength: 512, required: true},
})
const Model = mongoose.model('Student', schema)

module.exports = Model