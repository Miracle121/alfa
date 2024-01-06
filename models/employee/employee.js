const { Schema, model } = require("mongoose");
const employeeSchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Breanches",
      required: true,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    secondname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      required: true,
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: "Gender",
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    citizenship: {
      type: Schema.Types.ObjectId,
      ref: "Citizenship",
      required: true,
      // default:null
    },

    passportSeries: {
      type: String,
    },
    passportNumber: {
      type: String,
    },
    pin: {
      type: String,
      required: true,
    },

    regions: {
      type: Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
    districts: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    telephonenumber: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    position: {
      type: Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // required:true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
