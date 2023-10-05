require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const postRoute = require("./src/blog/routes/post");
const categoryRoute = require("./src/blog/routes/category");
const userRoute = require("./src/auth/routes/user");
const subscriptionRoute = require("./src/NewsletterSubscription/routes/subscription");
const cors = require("cors");

const _PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);
app.use("/api/subscription", subscriptionRoute);
app.use((req, res, next) => {
  res.status(404).send("404 - Page not found");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected..."))
  .catch((e) => console.log("an error occured " + e));

app.listen(_PORT, () => {
  console.log(`listening on port ${_PORT}`);
});
