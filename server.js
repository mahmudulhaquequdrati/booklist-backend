const express = require("express");
const { urlencoded } = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
let port = process.env.PORT || 3000;

// connect mongodb
const connectDB = require("./config/dbConnect");
connectDB();

//middleware
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});
app.use(express.urlencoded({ extended: true }));

//test api
app.get("/", (req, res) => {
  res.json({ message: "server is running on " + port });
});
const router = require("./routes/router");
app.use("/", router);

//server
mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`server is running port ${port}`));
});
