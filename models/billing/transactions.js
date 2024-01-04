const { Schema, model, Error } = require("mongoose");
const { ErrorResponse } = require("../../util/errorResponse");
const transactionSchema = new Schema(
  {
    //ID расчетного счета
    account_ID: {
      type: String,
      // required: true
    },

    //номер платежного поручения
    payment_order_number: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    //дата платежного поручения
    payment_order_date: {
      type: Date,
      required: true,
    },

    //сумма поступления
    payment_amount: {
      type: String,
      required: true,
    },

    //детали платежа
    payment_details: {
      type: String,
      required: true,
    },

    //наименование отправителя
    sender_name: {
      type: String,
      required: true,
    },

    //ИНН отправителя
    sender_taxpayer_number: {
      type: String,
      required: true,
    },

    // р/с отправителя
    // Client INN
    sender_bank_account: {
      type: String,
      required: true,
    },

    //МФО банка отправителя
    sender_bank_code: {
      type: String,
      required: true,
    },

    //ИНН банка отправителя
    sender_bank_taxpayer_number: {
      type: String,
      required: true,
    },

    // р/с получателя
    // Branch INN
    recipient_bank_account: {
      type: String,
      required: true,
    },

    //МФО банка получателя
    recipient_bank_code: {
      type: String,
      required: true,
    },

    //ИНН банка получателя
    recipient_bank_taxpayer_number: {
      type: String,
      required: true,
    },

    status_of_attachment: {
      type: String,
      enum: ["Новый", "B процессе", "Готов"],
      default: "Новый",
    },

    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },

    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },

    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const processDocument = async function (document) {
  try {
    const branch = await this.model("Branches").findOne({
      inn: document.recipient_bank_account,
    });

    const client = await this.model("Client").findOne({
      inn: document.sender_bank_account,
    });

    document.client = client._id;
    document.branch = branch._id;
    document.region = branch.region;
    document.district = branch.district;
  } catch (error) {
    console.error(error);
  }
};

// Apply the logic for each document before saving
transactionSchema.pre("insertMany", async function (next, documents) {
  try {
    for (const doc of documents) {
      await processDocument.call(this, doc);
    }
  } catch (error) {
    next(error);
  }

  next();
});

module.exports = model("Transactions", transactionSchema);
