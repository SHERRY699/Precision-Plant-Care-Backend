import express from "express";
import plantRegister from "../controllers/plantController.js";
import upload from '../utils/multer.js'
import cloudinary from '../utils/cloudinary.js';
import Plant from "../models/plant.js";



const router = express.Router()





router.post('/plants', upload.single('image'), async (req, res) => {
  const {
    name,
    userId,
    BlackSpots,
    Healthy,
    LeafCurl,
    class: imageClass,
    confidence
  } = req.body;

  if (!name || !userId || !req.file) {
    return res.status(400).json({ error: 'Name, image, and userId are required.' });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'plants' },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: 'Image upload failed.' });
        }

        const initialDiagnosis = {
          imageUrl: result.secure_url,
          BlackSpots: Number(BlackSpots ?? 0),
          Healthy: Number(Healthy ?? 0),
          LeafCurl: Number(LeafCurl ?? 0),
          class: imageClass ?? 'Unknown',
          confidence: Number(confidence ?? 0),
          createdAt: new Date(),
        };

        const newPlant = new Plant({
          name,
          userId,
          url: result.secure_url, // Initial image
          BlackSpots: initialDiagnosis.BlackSpots,
          Healthy: initialDiagnosis.Healthy,
          LeafCurl: initialDiagnosis.LeafCurl,
          class: initialDiagnosis.class,
          confidence: initialDiagnosis.confidence,
          history: [initialDiagnosis], // 👈 Add history array
        });

        await newPlant.save();
        res.status(201).json({ success: true, plant: newPlant });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


router.post("/track", upload.single("image"), async (req, res) => {
  try {
    const { plantId, BlackSpots, Healthy, LeafCurl, class: predictedClass, confidence, createdAt } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'plants/tracking' }, // Optional: separate folder for tracking images
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: "Image upload failed" });
        }

        plant.history.push({
          imageUrl: result.secure_url, // ✅ Cloudinary URL
          BlackSpots: parseFloat(BlackSpots),
          Healthy: parseFloat(Healthy),
          LeafCurl: parseFloat(LeafCurl),
          class: predictedClass,
          confidence: parseFloat(confidence),
          createdAt: createdAt ? new Date(createdAt) : new Date(),
        });

        await plant.save();

        res.status(200).json({ message: "Tracking data saved", plant });
      }
    );

    uploadStream.end(req.file.buffer); // ✅ stream the image buffer to Cloudinary
  } catch (err) {
    console.error("Track save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET /plants/:userId
router.get("/plant/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const plants = await Plant.find({ userId });

    res.status(200).json(plants);
  } catch (error) {
    console.error("Get plants error:", error);
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});


  
export default router