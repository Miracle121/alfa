const { Schema, model } = require("mongoose");
const warehouseSchema = new Schema(
  {
    policy_type_id: {
      type: Schema.Types.ObjectId,
      ref: "Typeofbco",
      required: true,
    },
    policy_number_of_digits_start: {
      type: Number,
      required: true,
    },
    policy_number_of_digits_end: {
      type: Number,
      required: true,
    },
    policy_count: {
      type: Number,
    },

    //     policy_blank_number:[{
    //         blank_number: {
    //             type:String
    //         },
    //         Is_usedblank:{
    //             type:Boolean
    //         },
    //     }
    // ],
    branch_id: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      // required: true
    },

    statusofpolicy: {
      type: Schema.Types.ObjectId,
      ref: "Statusbcopolicy",
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = model("warehouse", warehouseSchema);
