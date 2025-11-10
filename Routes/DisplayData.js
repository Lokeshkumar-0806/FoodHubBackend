
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// ✅ Add this route to serve food items and categories
router.post("/foodData", (req, res) => {
  try {
    res.status(200).send([global.food_items, global.food_category]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ...existing orderData route...
router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body;

    // ✅ Map cart items to match schema
    const formattedItems = order_data.map(item => ({
      id: item.id || item._id || "",
      name: item.name,
      qty: item.qty,
      size: item.size,
      price: item.price,
      img: item.img || ""
    }));

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [
          {
            items: [...formattedItems],   // ✅ Wrap in array
            order_date: new Date()
          }
        ]
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        {
          $push: {
            order_data: {
              items: [...formattedItems],  // ✅ Wrap in array
              order_date: new Date()
            }
          }
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;