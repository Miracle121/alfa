const {Schema,model} = require('mongoose')

const mfySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    regionId:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    districtId:{
        type:Schema.Types.ObjectId,
        ref: 'Districts',
        required: true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Mfy',mfySchema)