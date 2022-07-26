const {Schema,model} = require('mongoose')


const agentsSchema = new Schema({
    inn:{
        type:String,
        unique:true,
        required:true
    },
    branch:{
        type: Schema.Types.ObjectId,
        ref: 'Breanches',
        required:true     
    },
    agreementnumber:{
        type:String,
        required:true
    },
    agreementdate:{
        type:Date,
        required:true
    },
    typeofpersons:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofpersones',
        required:true
    },   
    typeofagent:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofagent'
     }, 
    isbeneficiary:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
    isfixedpolicyholde:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
   
    forindividualsdata:{
        name:{
            type:String         
        },
        secondname:{
            type:String
        },
        middlename:{
            type:String           
        },
        gender:{
            type: Schema.Types.ObjectId,
            ref: 'Gender',
            // required:true,
            // default:null
        },
        dateofbirth :{
            type:Date,
            // required:true,
            // default:null
        },
        citizenship:{
            type: Schema.Types.ObjectId,
            ref: 'Citizenship',
            // required:true,
            // default:null
        },
        typeofdocument:{
            type: Schema.Types.ObjectId,
            ref: 'Typeofdocument',
            // required:true,
            // default:null
        },
        passportSeries:  {
            type:String
         },
        passportNumber:  {
            type:String
         },
        pin:{
            type:String           
        },
        passportissuancedate:{
            type:Date
        },
        passportissuedby:{
            type:String
        },
        regions:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        // required:true
        },
        districts:{
        type: Schema.Types.ObjectId,
        ref: 'Districts',
        // required:true
        },
        address:{
          type:String
        },
        postcode:{
            type:String
        },
        telephonenumber:{
            type:String
         },
        emailforcontact:{
            type:String
         },
        personalaccount:{
            type:String
         },
        transitaccount:{
           type:String
         },
        mfo:{
        type:String
        },
        nameofbank:{
        type:String
        }, 
        numberofcard:{
            type:String
        }       
    },
    corporateentitiesdata: {     
        nameoforganization:{
            type:String            
        },
        oked:{
            type:String
        },
        mfo:{
            type:String
        },
        nameofbank:{
            type:String
        },
        innofbank:{
            type:String
        },
        scheduledaccount:{
            type:String
        },
        regionId:{
            type: Schema.Types.ObjectId,
            ref: 'Region'            
         },
        districts:{
            type: Schema.Types.ObjectId,
            ref: 'Districts',
            // required:true
         }, 
        address:{
            type:String
        },
        postcode:{
            type:String
        },
        checkingaccount:{
            type:String,
            // required:true
        },
        employees:[{
            fullname:{
                type:String,
                // required:true
            },
            positions:{
                type: Schema.Types.ObjectId,
                ref: 'Positions',
                // required:true
            },
            typeofdocumentsformanager:{
                type: Schema.Types.ObjectId,
                ref: 'Typeofdocuments',
                // required:true
            },
            documentnumber:{
                type:String               
            },
            dateofmanagerdocument:{
                type:Date                
            },
            expirationdate:{
                type:Date 
            },
            telephonenumber:{
                type:String
            },
            emailforcontacts:{
                type:String
            }
        }]

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