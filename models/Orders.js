
// const mongoose = require('mongoose');
// const { Schema } = mongoose; 

// const ItemSchema = new Schema({
//   id: { type: String },
//   name: { type: String, required: true },
//   qty: { type: Number, required: true },
//   size: { type: String },
//   price: { type: Number, required: true },
//   img: { type: String }
// });

// const OrderSchema = new Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   order_data: [
//     {
//       items: [ItemSchema],   // ✅ structured array of items
//       order_date: { type: Date, default: Date.now }
//     }
//   ]
// });

// module.exports = mongoose.model('Order', OrderSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ItemSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  size: { type: String },
  price: { type: Number, required: true },
  img: { type: String }
});

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  order_data: [
    {
      items: [ItemSchema],   // ✅ structured array of items
      payment_id: { type: String },    // ✅ store Razorpay payment ID
      status: { type: String },        // ✅ Success / Failed
      order_date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Order', OrderSchema);
