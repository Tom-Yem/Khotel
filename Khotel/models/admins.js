const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');

const schema = new mongoose.Schema({
    email:{ 
        type: String,
        required:true,
        unique:true
    },
    password:{ 
        type: String,
        required: true
    },
    facebook:{
       id: String,
       name: String 
    }
})
schema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('privateKey'));
    return token;
}
const Admin = mongoose.model('admins',schema);

function validateAdmin(Admin){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(Admin,schema);
 }

module.exports.Admin = Admin;
module.exports.validateAdmin = validateAdmin;