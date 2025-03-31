import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 8081;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("bloodbank");
  console.log("Connected to MongoDB");
}

connectDB().catch(console.error);

// **API Route to Fetch Hospitals**
app.get("/api/hospitals", async (req, res) => {
  try {
    const hospitals = await db.collection("hospitals").find().toArray();
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// **Run Server**
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
