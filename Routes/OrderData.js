
// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Orders");

// router.post("/orderData", async (req, res) => {
//   try {
//     let data = req.body.order_data;

//     let orderDetails = {
//       email: req.body.email,
//       order_data: data   // ✅ store directly, no "items"
//     };

//     let eId = await Order.findOne({ email: req.body.email });

//     if (eId === null) {
//       await Order.create(orderDetails);
//     } else {
//       await Order.findOneAndUpdate(
//         { email: req.body.email },
//         { $push: { order_data: { $each: data } } }   // ✅ push each item into array
//       );
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// })
// router.post("/myorderData", async (req, res) => {
//   try{
//     let myData = await Order.find({ email: req.body.email });
//     res.json({orderData: myData})
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// })

// module.exports = router;
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Save order after payment
router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body; // order_data contains items + payment_id + status

    // Prepare order object
    const orderDetails = {
      email: email,
      order_data: order_data.map(item => ({
        items: item.items,              // array of cart items
        payment_id: item.payment_id,    // Razorpay payment ID
        status: item.status,            // Success / Failed
        order_date: item.order_date || new Date()
      }))
    };

    // Check if user already has orders
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create(orderDetails);
    } else {
      // Push each new order into existing user's order_data array
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: { $each: orderDetails.order_data } } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get all orders for a user
router.post("/myorderData", async (req, res) => {
  try {
    const { email } = req.body;
    const myData = await Order.find({ email });
    res.json({ orderData: myData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
