const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email:{
        type:'String',
        require: true,
        unique: true
    },
    password:{
        type:'String',
        require:true
    }
})

//static signup method
userSchema.statics.signup = async function (email , password){
    
    //validation
    if(!email || !password){
        throw Error('All fields are required!')
    }
    if(!validator.isEmail(email)){
        throw Error('Ivalid Email ID')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({email})
    if(exists){
        throw Error('This Email is already in use')
    }

    // const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,10)
    const user = await this.create({email , password:hash})
    return user
}

//static login method

userSchema.statics.login = async function(email , password){
    if(!email || !password){
        throw Error('All fields are required')
    }
    // if(!validator.isEmail(email)){
    //     throw Error('Ivalid Email ID')
    // }
    const user= await this.findOne({email})
    if(!user){
        throw Error('The email entered is incorrect')
    }
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)