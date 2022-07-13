const mongoose = require('mongoose')

const Schema= mongoose.Schema
 const userSchema = new Schema({
    fullname:{
         type:String,
        //  required:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     },
     agentId:{
        type: Schema.Types.ObjectId,
        ref: 'Agents',
        required: true
     },
     accountstatus:{
        type: Schema.Types.ObjectId,
        ref: 'Accountstatus',
        required: true
     },
     accountrole:{
        type: Schema.Types.ObjectId,
        ref: 'Accountroles',
        required: true
     },   
     creatorId:{
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
  } 
 },
 {timestamps:true }
 )


 module.exports = mongoose.model('Users',userSchema)
