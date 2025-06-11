import Plant from "../models/plant.js";
import User from "../models/user.js";

export default async function plantRegister(req,res) {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: "userId and name are required" });
  }

  try {
    const newPlant = await Plant.create({ name, user: userId });

    // Optionally push plant ID to user's plants array if you want back-reference
    await User.findByIdAndUpdate(userId, { $push: { plants: newPlant._id } });

    res.status(201).json(newPlant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

