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

const View = model("View", schema);

module.exports = View;
