const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// ✅ Route for fetching data (food items + categories)
router.post("/display", (req, res) => {
  try {
    if (!global.food_items || !global.food_category) {
      return res.status(500).send("Data not loaded yet. Try again.");
    }
    res.status(200).send([global.food_items, global.food_category]);
  } catch (error) {
    console.error("Display route error:", error.message);
    res.status(500).send("Server Error");
  }
});

// ✅ Route for saving order data
router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body;

    if (!email || !Array.isArray(order_data))
      return res.status(400).json({ success: false, message: "Invalid request" });

    const formattedItems = order_data.map((item) => ({
      id: item.id || item._id || "",
      name: item.name,
      qty: item.qty,
      size: item.size,
      price: item.price,
      img: item.img || "",
    }));

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [
          {
            items: [...formattedItems],
            order_date: new Date(),
          },
        ],
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        {
          $push: {
            order_data: {
              items: [...formattedItems],
              order_date: new Date(),
            },
          },
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("OrderData route error:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
