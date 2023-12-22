const { Schema, model } = require("mongoose");
const bcoSchema = new Schema(
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
    act_id: {
      type: Schema.Types.ObjectId,
      ref: "Acts",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // required: true
    },
  },

  { timestamps: true }
);

module.exports = model("Bco", bcoSchema);
