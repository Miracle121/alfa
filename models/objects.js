const { Schema, model } = require("mongoose");

const objectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    typobjectsId: {
      type: Schema.Types.ObjectId,
      ref: "Typeofobjects",
      required: true,
    },
    details: Schema.Types.Mixed,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

objectsSchema.virtual("type", {
  ref: "Typeofobjects",
  localField: "typobjectsId",
  foreignField: "_id",
  justOne: true,
});

module.exports = model("Objects", objectsSchema);
