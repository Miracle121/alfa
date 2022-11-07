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
        ref: 'Agreements',
        required:true
    },

      //== endi qilinadi==
      resultofendorsements:{
        type: Schema.Types.ObjectId,
        ref: 'Resultofendorsements',
        required:true

    },    


//Запрос на заключение
    reqforconclusion:{
        type:String,
        required:true

    },  




    //Запрос на изменение вординга


  








   

    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},

{ timestamps:true })

module.exports = model('Endorsements',endorsementsSchema)