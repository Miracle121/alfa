const {Schema,model} = require('mongoose')
const statusofendorsementsSchema = new Schema({
    name:{
        type:String,
        required:true
        },    
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},

{ timestamps:true })

module.exports = model('Statusofendorsements',statusofendorsementsSchema)