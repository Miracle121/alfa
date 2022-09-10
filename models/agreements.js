const {Schema,model} = require('mongoose')
const agreementsSchema = new Schema({
    //==========================Продукт================
    groupofproductsId:{
        type: Schema.Types.ObjectId,
        ref: 'Groupsofproducts',
        required: true
    },
    subgroupofproductsId:{
        type: Schema.Types.ObjectId,
        ref: 'Subgroupofproducts',
        required: true
    },
    products:{
        type: Schema.Types.ObjectId,
        ref: 'Products',
    },
    startofinsurance:{
        type:Date 
    },
    endofinsurance:{
        type:Date 
    },
    clinets:{
            type: Schema.Types.ObjectId,
            ref: 'Agents',        
    },
    beneficiary:{
        type: Schema.Types.ObjectId,
        ref: 'Agents'
    },
    pledgers:[{
        type: Schema.Types.ObjectId,
        ref: 'Agents', 
        required: true
    }],
 
    riskId:[{
        riskgroup:{
          type: Schema.Types.ObjectId,
          ref: 'Typeofrisks',
          required: true         
          },
        risk:{ 
          type: Schema.Types.ObjectId,
          ref: 'Risks',
          required: true
          },
        classeId:{ 
              type: Schema.Types.ObjectId,
              ref: 'Classesofproduct',
              required: true
              },
        startdate:{
            type:Date 
            },
        enddate:{
                type:Date
            },
        insurancepremium:{
            type:Number
        },
        insurancerate:{
            type:Number
        },
        suminsured:{
            type:Number
        }
        
      } ],
    totalsuminsured:{
        type:Number
    },
    totalinsurancepremium:{
        type:Number
    },
    accruedinsurancepremium:{
        type:Number
    },
    paidinsurancepremium:{
        type:Number
    },
    paymentcurrency:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofpayments',
        required: true  
    },
    duplicatefee:[{
        Isduplicatefee:{
            type:Boolean
        },
        typeoffee:{
            type: String,
            enum:['%','sum'],
            required: true  
        },
        countoffee:{
            type:Number
        }
    }],
    demonstrablecosts:[{
        Isdemonstrablecosts:{
            type:Boolean
        },
       
        typeoffee:{
            type: String,
            enum:['%','sum'],
           
            required: true  
        },
        countoffee:{
            type:Number
        }
    }],
    premiumpaymentschedule:[{
        scheduledate:{
            type:Date
        },
        schedulecount:{
            type:Number
        }
        
    }],
    franchise:[{
        risk:{
            type: Schema.Types.ObjectId,
            ref: 'Risks',
            required: true
        },
        Isfranchise:{
            type:Boolean,
            required: true
        },
        Isfixedfranchise:{
            type:Boolean,
            required: true
        },
        fixedvalue:{
            type:Number,
            required: true
        },
        typeoffranchise:{
            type: Schema.Types.ObjectId,
            ref: 'Typeoffranchise',
            // required: true
        },
        baseoffranchise:{        
            type: Schema.Types.ObjectId,
            ref: 'Baseoffranchise',
            // required: true
        },
        franchise:{
             type: String
            //  required: true
        }   
        }],     
    //==========Расторжение=====
    termination:[{
        terminationdate:{
            type:Date
        },
        chargedamountreturned:{
            type:String
        },
        amountreturned:{
            type:String
        },
         //== endi qilinadi
        reason:{
            type: Schema.Types.ObjectId,
            ref: 'Reason',
            required: true
        },

         }],     
    commission:[{
        agents:{
            type: Schema.Types.ObjectId,
            ref: 'Agents',
            required: true
        },
        percentageremuneration:{
            type:String
        },
        accruedcommissionamount:{
            type:String
        },
        commissionamountpaid:{
            type:String
        },
        accruedcommissionrefund:{
            type:String
        },
        // accruedcommissionrefund:{
        //     type:String
        // },
        returnedcommission:{
            type:String
        }
         }],
    rpm:[{
            perdeductionsRPM:{
                type:String
            },
            amountdeductionsRPM:{
                type:String
            }
         }],
    //=======Документооборот========
    appregistrationnumber:{
        type:String
    },
    applicationdate:{
        type:Date
    },
    whoaccepted:{
        type:String
    },
    copyofdocuments:{
        type:String
    },
    //======Договор=======
    generalagreement:{
        type:Boolean
    },
    numberofcontract:{
        type:String
    },
    agreementdate:{
        type:Date
    },
    copyofagreement:{
        type:String
    },
    //=============Приложения===============
    documents:[{
        editaneldocumentation:{
            type:String
        }
    }],

    //=============Полис======
    policy:[{
        policyId:{
            type: Schema.Types.ObjectId,
            ref: 'Policy'
        },
    }],
    //==================Индоссаменты========
    endorsements:[{
        endorsementsId:{
        type: Schema.Types.ObjectId,
        ref: 'Endorsements'
    }}],
    
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},

{ timestamps:true })

module.exports = model('Agreements',agreementsSchema)