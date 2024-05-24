const mongoose = require("mongoose");
const mongo = async () =>
  mongoose.connect(
    "mongodb+srv://ci_data:0MGRp3qgLk3hVx71@cluster0.lkhok60.mongodb.net/ci?retryWrites=true&w=majority"
  );

module.exports = mongo;
