const {Schema,model} = require('mongoose')
const endorsementsSchema = new Schema({
    // ummumiy qisim
    agreementsId:{
        type: Schema.Types.ObjectId,
        ref: 'Agreements',
        required:true
    },

    typeofendorsements:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofendorsements',
        required:true
    }, 
    reqforconclusion:{
        type:String    
    },  
    endorsementsinfo:[{  
        type: Schema.Types.Mixed 
    }],
    statusofendorsements:{
        type: Schema.Types.ObjectId,
        ref: 'Statusofendorsements',
        required:true
    },
  

    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},

{ timestamps:true })

module.exports = model('Endorsements',endorsementsSchema)