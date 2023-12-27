const { Schema, model } = require("mongoose");

const regionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

regionSchema.virtual("districts", {
  ref: "District",
  localField: "_id",
  foreignField: "region",
  justOne: false,
});

module.exports = model("Region", regionSchema);
