const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(
      "mongodb+srv://lokeshkr0806:admin@cluster0.2gnamyi.mongodb.net/yalo?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("✅ Connected to MongoDB");

    // Wait until connection is ready before accessing db
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not ready yet");

    // Fetch collections
    const foodItemsCollection = db.collection("food_item");
    const foodCategoryCollection = db.collection("foodCateogry");

    // Fetch data
    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    // Store globally
    global.food_items = foodItems;
    global.food_category = foodCategories;

    console.log("✅ Fetched food_items and food_category successfully");
  } catch (err) {
    console.error("❌ MongoDB connection or fetch error:", err.message);
    throw err; // Let the caller handle it
  }
};

module.exports = mongoDB;
