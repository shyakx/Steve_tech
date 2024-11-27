const express = require("express");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-project-id>.firebaseio.com",
});

const db = admin.firestore();
const app = express();

// Middleware
app.use(express.json());

// Authentication Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Data Storage Route
app.post("/store-data", async (req, res) => {
  const { collection, data } = req.body;

  try {
    const docRef = await db.collection(collection).add(data);
    res.status(201).json({ message: "Data stored successfully", id: docRef.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
