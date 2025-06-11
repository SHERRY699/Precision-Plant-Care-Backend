import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },  // Original image URL, if needed for the first image
  history: [
    {
      imageUrl: { type: String, required: true }, // URL of the new image
      BlackSpots: { type: Number },
      Healthy: { type: Number },
      LeafCurl: { type: Number },
      class: { type: String },
      confidence: { type: Number },
      createdAt: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

export default mongoose.model("Plant", plantSchema);
