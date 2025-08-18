const mongoose = require("mongoose");
require("dotenv").config();
const Connectdb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database was connected"))
    .catch((e) => console.log(e));
};

module.exports = Connectdb;
