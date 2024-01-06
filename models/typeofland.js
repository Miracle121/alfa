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

const Typeofland = model("Typeofland", schema);

module.exports = Typeofland;
