const { Schema, model } = require("mongoose");

const measurementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Measurement = model("Measurement", measurementSchema);

module.exports = Measurement;
