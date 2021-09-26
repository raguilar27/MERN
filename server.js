const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");

const app = express();

//body parser
app.use(express.json());

// CORS HEADERS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // if it's not set to all domains, update '*' to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
