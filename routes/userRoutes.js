import express from "express";
import { LoginController, RegisterController,LogoutController } from "../controllers/userController.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Login Route
router.post("/login", LoginController);

// Register Route
router.post("/register", RegisterController);

//Logout Route 
router.post("/logout",LogoutController)



// //upload image 
// router.post('/upload/:userId', upload.single('image'), async (req, res) => {
//   const { userId } = req.params;
  
//   // Ensure that the necessary fields (BlackSpots, Healthy, LeafCurl, class, confidence) are present
//   const { BlackSpots, Healthy, LeafCurl, class: imageClass, confidence } = req.body;
  
//   if (BlackSpots === undefined || Healthy === undefined || LeafCurl === undefined || imageClass === undefined || confidence === undefined) {
//   return res.status(400).json({ error: 'All fields (BlackSpots, Healthy, LeafCurl, class, confidence) are required.' });
//   }
  
//   // Upload the image to Cloudinary
//   try {
//   const uploadStream = cloudinary.uploader.upload_stream(
//   { folder: 'user_images' },
//   async (error, result) => {
//   if (error) return res.status(500).json({ error });
  
//   // Create the image entry with URL and the provided fields
//   const imageEntry = {
//   url: result.secure_url,
//   BlackSpots: Number(BlackSpots),
//   Healthy: Number(Healthy),
//   LeafCurl: Number(LeafCurl),
//   class: imageClass,
//   confidence: Number(confidence),
//   };
  
//   // Update the user with the new image entry
//   const user = await User.findByIdAndUpdate(
//   userId,
//   { $push: { images: imageEntry } },
//   { new: true }
//   );
  
//   res.json(user); // Return the updated user object
//   }
//   );
  
//   uploadStream.end(req.file.buffer); // Upload the image file to Cloudinary
//   } catch (err) {
//   res.status(500).json({ error: err.message });
//   }
//   });



// // Get Users By Id 

// router.get("/:id",async (req,res)=>{
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       role: user.role,
//       images: user.images, // This includes the prediction data
//     });
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// } );




export default router
