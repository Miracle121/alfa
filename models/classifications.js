const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Classification = model("Classification", schema);

module.exports = Classification;
