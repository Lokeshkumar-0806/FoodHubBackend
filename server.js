// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const orderRoutes = require("./Routes/OrderData");
// const paymentRoutes = require("./Routes/payment");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/bellyfuel", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error("MongoDB connection error:", err));

// // Mount routes
// app.use("/api", orderRoutes);
// // app.use("/payment", paymentRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./Routes/OrderData");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Mount routes
app.use("/api", orderRoutes);
// app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 5000; // Use dynamic port for deployment
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
