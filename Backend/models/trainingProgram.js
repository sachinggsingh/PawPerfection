import mongoose from 'mongoose'

const trainingSchema = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
      min: 1
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    task: {
        type: [String],
        required: true,
        validate: {
          validator: function(v) {
            return v.length > 0;
          },
          message: 'At least one task is required'
        }
    },
    resources: {
        type: [String], 
        default: []
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Training", trainingSchema);
