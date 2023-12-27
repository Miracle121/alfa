const { Schema, model } = require("mongoose");

const districtsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
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

module.exports = model("District", districtsSchema);
