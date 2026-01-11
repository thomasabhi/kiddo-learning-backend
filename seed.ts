import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Content } from "./src/models/content.model";
import cloudinary from "cloudinary";

dotenv.config();

const MONGO_URI = process.env.DB_CONNECTION!;

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const loadSeed = async (filePath: string) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const item of data) {
    let imageUrl = item.imageUrl || "";

    // Upload to Cloudinary if local image exists
    if (item.imageFile) {
      const uploadResult = await cloudinary.v2.uploader.upload(item.imageFile, {
        folder: "contents",
      });
      imageUrl = uploadResult.secure_url;
      console.log(`Uploaded ${item.title || "no-title"} -> ${imageUrl}`);
    }

    // Save to MongoDB
    await Content.create({
      ...item,
      imageUrl,
    });
  }
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await loadSeed("./src/seeds/alphabet.json");
    await loadSeed("./src/seeds/numbers.json");
    await loadSeed("./src/seeds/animals.json");
    await loadSeed("./src/seeds/math.json");
    await loadSeed("./src/seeds/flowers.json");
    await loadSeed("./src/seeds/fruit.json");
    await loadSeed("./src/seeds/vegetables.json");
    await loadSeed("./src/seeds/bird.json");
    // await loadSeed("./src/seeds/insect.json");

    console.log("Seeding finished!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

run();
