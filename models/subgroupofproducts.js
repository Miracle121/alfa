const {Schema,model} = require('mongoose')

const subgroupofproductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    groupId:{
        type: Schema.Types.ObjectId,
        ref: 'Groupsofproducts',
        required: true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Subgroupofproducts',subgroupofproductSchema)