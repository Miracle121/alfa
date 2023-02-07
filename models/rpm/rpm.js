const {Schema,model} = require('mongoose')


const rpmSchema = new Schema({
    agents_id: {
        type: Schema.Types.ObjectId,
        ref: 'Agents', 
        required: true
    },
    agencycommission:{
        min:{
            type: Number,
            required: true
        },
        max:{
            type: Number,
            required: true
        },
        manage_hold_termination:{
            type: Boolean,
            required: true

        },
        hold_termination:{
            type: Boolean,
            required: true
        }
    },
    contribution_rpm:{
        min:{
            type: Number,
            required: true
        },
        max:{
            type: Number,
            required: true
        },
        ischanged:{
            type: Boolean,
            required: true
        } 

    },
    penalty_defacement:{
        type: Number,
        // required: true
    },
    penalty_loss:{
        type: Number,
        // required: true
    },


    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Rpm',rpmSchema)