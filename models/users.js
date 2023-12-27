const mongoose = require("mongoose");
const { compare, genSalt, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { config } = require("../config/config");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    branch_Id: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      // required:true
    },
    agent_Id: {
      type: Schema.Types.ObjectId,
      ref: "Agents",
      // required: true
    },
    emp_Id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      // required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    accountstatus: {
      type: Schema.Types.ObjectId,
      ref: "Accountstatus",
      required: true,
    },
    accountrole: {
      type: Schema.Types.ObjectId,
      ref: "Accountroles",
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      // required: true
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Sign JWT token and return
userSchema.methods.getSignedJwtToken = function () {
  return sign(
    {
      userId: this._id,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expire,
    }
  );
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
