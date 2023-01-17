const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const routes = require("./routes/route");
const URI = process.env.DB_URI

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("frontend/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
//   });
// }

app.listen(port, () => {
  console.log("App is running on port", port);
});
