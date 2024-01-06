const { Schema, model } = require("mongoose");
const actsSchema = new Schema(
  {
    act_number: {
      type: String,
      required: true,
    },
    act_date: {
      type: Date,
      required: true,
    },
    sender_branch_id: {
      type: Schema.Types.ObjectId,
      ref: "Breanches",
      required: true,
    },
    sender_employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiver_branch_id: {
      type: Schema.Types.ObjectId,
      ref: "Breanches",
      required: true,
    },
    receiver_employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    //===========================
    bco_data: [
      {
        policy_type_id: {
          type: Schema.Types.ObjectId,
          ref: "Typeofbco",
          required: true,
        },
        policy_blank_number_from: {
          type: Number,
          required: true,
        },
        policy_blank_number_to: {
          type: Number,
          required: true,
        },
        blank_number: {
          type: Array,
        },
        blank_counts: {
          type: Number,
          required: true,
        },
      },
    ],

    // blanksinact: [
    //     {
    //         blanks_id: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'StatusActs'
    //         }
    //     }],

    statusofact: {
      type: Schema.Types.ObjectId,
      ref: "StatusActs",
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

module.exports = model("Acts", actsSchema);
