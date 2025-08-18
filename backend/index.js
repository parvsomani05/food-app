const express = require("express");
const app = express();
require("dotenv").config();
const connectdb = require("./config/connectdb");
const route = require("./routes/loginroute");
const cors = require("cors");
connectdb();
app.use(cors());
app.use(express.json());
app.use("/api", route);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`port ${port} is listen`);
});
