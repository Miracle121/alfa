const { Schema, model } = require("mongoose");

const branchesSchema = new Schema(
  {
    levelofbranches: {
      type: Schema.Types.ObjectId,
      ref: "Levelofbranch",
      required: true,
    },
    codeofbranches: {
      type: String,
      required: true,
    },
    inn: {
      type: String,
      required: true,
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
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
    branchstatus: {
      type: Schema.Types.ObjectId,
      ref: "Branchsstatus",
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

branchesSchema.pre("save", async function (next) {
  try {
    console.log(this);
    const district = await this.model("District").findById(this.district);

    this.region = district.region;

    next();
  } catch (error) {
    next(error);
  }
});

branchesSchema.virtual("policies", {
  ref: "Policy",
  localField: "_id",
  foreignField: "branch_id",
  justOne: false,
});

branchesSchema.virtual("blanks", {
  ref: "Policyblank",
  localField: "_id",
  foreignField: "branch_id",
  justOne: false,
  match: {
    Is_given: true,
  },
});

module.exports = model("Branches", branchesSchema);
