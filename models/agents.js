const {Schema,model} = require('mongoose')


const agentsSchema = new Schema({
    inn:{
        type:String,
        unique:true,
        required:true
    },
    typeofpersons:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofpersones',
        required:true
    },
    regionId:{
        type: Schema.Types.ObjectId,
        ref: 'Region'            
     },    
    
    //======Isbeneficiary======= 
    isbeneficiary:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
    isfixedpolicyholde:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
    //==========end======= 
    typeofagent:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofagent'
     }, 
    forindividualsdata:{
        fullname:{
            type:String
        },
        passportSeries:  {
            type:String
         },
        pin:{
            type:String           
        },
        passportissuancedate:{
            type:String
        },
        passportissuedby:{
            type:String
        },
        dateofbirth:{
            type:Date
        },
        numberofcard:{
            type:String
        }       
    },
    corporateentitiesdata:
        {
            fullname:{
            type:String  
        },    
        nameoforganization:{
            type:String            
        },
        oked:{
            type:String
        },
        mfo:{
            type:String
        },
        bank:{
            type:String
        },
        scheduledaccount:{
            type:String
        }
     },
    address:{
        type:String
     },
    telephonenumber:{
        type:String
     },   
    isUsedourpanel:{
        type:Boolean
    },
    isUserRestAPI:{
        type:Boolean
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
{ timestamps:true })

module.exports = model('Agents',agentsSchema)