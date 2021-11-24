const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const colors = require("colors");
const webpush = require("web-push");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// routes
const productRoutes = require("./routes/Products");
const userRoutes = require("./routes/Auth");
const orderRoutes = require("./routes/Orders");
const path = require("path");
// define app
const app = express();
//db
const connectDB = require("./config/db");
connectDB();

//port
const PORT = 8080;

app.use(express.json());
//cors
app.use(cors({ origin: true }));
// You can generate VAPID keys using the command:
// ./node_modules/.bin/web-push generate-vapid-keys**
webpush.setVapidDetails(
  "mailto: `http://precisionordnance.com.au/`",
  "BDoTumj2UX0sR8Vwq5rRZo8JzWlz_WVUXcKUIcJFKBJbRBdbuGkPERc_SHvJLDNL4o7c1Gc05HHoUGCGa-40EN4",
  "phFI9iakLqG1aIV_h7jSRBKKtImw9uRQVkJhK8ZgJ08"
);

app.get("/", (req, res) => {
  res.send("welcome to markosis");
});
// notify
app.post("/notifications/subscribe", (req, res) => {
  // console.log(req.body);
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  console.log(req.user);
  webpush
    .sendNotification(req.body.subscription, payload)
    .then((result) => console.log())
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});
//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", require("./routes/Upload"));
app.use("/api/subscribe", require("./routes/Subscribe"));

//err handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));