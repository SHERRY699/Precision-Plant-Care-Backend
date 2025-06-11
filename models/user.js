
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    plants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export  default mongoose.model("User", userSchema);
