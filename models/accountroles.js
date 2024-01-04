const { Schema, model } = require("mongoose");
const accountrolesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },

  { timestamps: true }
);

module.exports = model("Accountroles", accountrolesSchema);
