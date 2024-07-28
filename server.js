const express = require("express");
const db = require("./config/connection.js");
const PORT = 3001;
const app = express();
const routes = require("./routes");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize controller/routes
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
});