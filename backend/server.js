const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRoutes = require("./routes/books");
const sequelize = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/books", bookRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => console.log(`Server is running on {localhost://5000}`));
});
