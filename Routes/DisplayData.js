const express = require("express");
const router = express.Router();

/**
 * ✅ Unified function to send global food data.
 * Works for both GET (browser) and POST (frontend).
 */
const sendFoodData = (req, res) => {
  try {
    // Ensure global data is loaded before sending
    if (!global.food_items || !global.food_category) {
      return res.status(503).json({
        success: false,
        message: "Data not yet loaded from database. Try again in a few seconds."
      });
    }

    res.status(200).json({
      success: true,
      food_items: global.food_items,
      food_category: global.food_category
    });
  } catch (error) {
    console.error("Error sending food data:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * ✅ GET & POST routes — so it works in both browser and app requests
 */
router.get("/foodData", sendFoodData);
router.post("/foodData", sendFoodData);

module.exports = router;
