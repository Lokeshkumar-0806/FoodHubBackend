
const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(
            "mongodb+srv://lokeshkr0806:admin@cluster0.2gnamyi.mongodb.net/yalo?retryWrites=true&w=majority&appName=Cluster0",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        console.log("Connected to MongoDB");

        // Wait for the connection to be ready
        const db = mongoose.connection.db;
        if (!db) throw new Error("MongoDB connection not ready");

        // Fetch all documents from 'food_items' collection
        const collection = db.collection("food_item");
        const data = await collection.find({}).toArray();
        global.food_items = data;
        console.log("Fetched food_items:", global.food_items);

        // Fetch all documents from 'food_category' collection
        const categoryCollection = db.collection("foodCateogry");
        const catData = await categoryCollection.find({}).toArray();
        global.food_category = catData;
        console.log("Fetched food_category:", global.food_category);

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

mongoDB();

module.exports = mongoDB;
