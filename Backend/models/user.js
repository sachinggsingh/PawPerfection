import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // password is optional for OAuth users
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows multiple nulls
  },
  name: {
    type: String,
  },
  refreshToken: {
    type: String,
    default: null,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
