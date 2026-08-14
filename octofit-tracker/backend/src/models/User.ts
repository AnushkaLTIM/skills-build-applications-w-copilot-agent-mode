import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'Athlete' | 'Coach' | 'Admin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Athlete', 'Coach', 'Admin'],
      default: 'Athlete',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
