const express = require("express");
const app = express();
const mongoDB = require("./db");

// Use dynamic port for deployment
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// ✅ Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with frontend URL on Vercel after deployment
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Test route
app.get("/", (req, res) => res.send("Hello World from FoodHub Backend! 👋"));

// Mount routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

const startServer = async () => {
  try {
    await mongoDB(); // Wait for MongoDB before starting server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
