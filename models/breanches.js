const { Schema, model } = require("mongoose");

const breanchesSchema = new Schema(
  {
    levelofbreanches: {
      type: Schema.Types.ObjectId,
      ref: "Levelofbranch",
      required: true,
    },
    codeofbreanches: {
      type: String,
      required: true,
    },
    inn: {
      type: String,
      required: true,
    },
    regionId: {
      type: Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
    branchname: {
      type: String,
      required: true,
    },
    shorttitleofbranch: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    agreementnumber: {
      type: String,
      required: true,
    },
    agreementdate: {
      type: Date,
      required: true,
    },
    expirationdate: {
      type: Date,
      required: true,
    },
    employees: [
      {
        fullname: {
          type: String,
          required: true,
        },
        positions: {
          type: Schema.Types.ObjectId,
          ref: "position",
          required: true,
        },

        telephonenumber: {
          type: String,
        },
        emailforcontacts: {
          type: String,
        },
      },
    ],
    checkingaccount: {
      type: String,
      required: true,
    },
    mfo: {
      type: String,
      required: true,
    },
    nameofbank: {
      type: String,
      required: true,
    },
    breanchstatus: {
      type: Schema.Types.ObjectId,
      ref: "Breanchsstatus",
      required: true,
    },
    fond_id: {
      type: Number,
      default: 0,
    },

    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Breanches", breanchesSchema);
