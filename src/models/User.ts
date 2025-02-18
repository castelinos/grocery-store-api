import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const saltRounds = 12;

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model('User',userSchema);