import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
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
    // Add this inside the schema
    images: [
      {
        url: { type: String },
        BlackSpots: { type: Number },
        Healthy: { type: Number },
        LeafCurl: { type: Number },
        class: { type: String },
        confidence: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
