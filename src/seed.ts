import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/content.model"
dotenv.config();

const MONGO_URI = process.env.DB_CONNECTION!;

const loadSeed = async (filePath: string) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  await Content.insertMany(data);
  console.log(`Seeded ${filePath}`);
};

const run = async () => {
  await mongoose.connect(MONGO_URI);
  await loadSeed("./src/seeds/alphabet.json");
  await loadSeed("./src/seeds/numbers.json");
  await loadSeed("./src/seeds/animals.json");
  await loadSeed("./src/seeds/math.json");
  await loadSeed("./src/seeds/songs.json");
  await loadSeed("./src/seeds/flowers.json");
  await loadSeed("./src/seeds/fruit.json");
  await loadSeed("./src/seeds/vegatbles.json")
  mongoose.disconnect();
};

run();
