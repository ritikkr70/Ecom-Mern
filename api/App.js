const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const userRoute = require("./routes/User");
const itemRoute = require("./routes/Products");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", itemRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
