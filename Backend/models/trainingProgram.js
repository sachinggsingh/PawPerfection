const mongoose = require("mongoose");

const trainingModel = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    task: {
        type: [String],
        required: true,
      },
      resources: {
        type: [String], 
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Training", trainingModel);
