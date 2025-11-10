
// const express = require('express');
// const app = express();
// const port = 5000;
// const mongoDB = require("./db");
// // const paymentRoute = require("./Routes/payment");

// // Connect to MongoDB
// mongoDB();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // CORS Middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // Test route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // app.use("/payment", paymentRoute);
// // Mount routers
// app.use('/api', require("./Routes/CreateUser"));
// app.use('/api', require("./Routes/DisplayData"));
// app.use('/api', require("./Routes/OrderData"));

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express');
const app = express();
const mongoDB = require("./db");
// const paymentRoute = require("./Routes/payment");

// Use dynamic port for deployment
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  // Replace '*' with your Vercel frontend URL after deployment if you want to restrict it
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mount routers
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
// app.use("/payment", paymentRoute); // Uncomment if using payment

const startServer = async () => {
  try {
    await mongoDB();
    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
