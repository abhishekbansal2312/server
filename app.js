const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");


const app = express();

const MongoDB = process.env.MONGO_URL;

mongoose
  .connect(MongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const membersRoute = require("./routes/membersRoute");
// const contactRoute = require("./routes/contactRoute");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/members", membersRoute);
// app.use("/api/contact", contactRoute); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4600, () => {
  console.log("http://localhost:4600");
});
