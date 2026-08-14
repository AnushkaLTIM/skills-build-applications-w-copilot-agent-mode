import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: number;
  sport: string;
  members_list: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    members_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
