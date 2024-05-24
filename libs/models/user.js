const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_login: { type: String },
    user_pass: { type: String },
    user_nicename: { type: String },
    user_email: { type: String },
    user_url: { type: String },
    user_registerd: { type: String },
    user_activation_key: { type: String },
    user_status: { type: String },
    user_key: { type: String },
    user_id: { type: String },
    user_meta_data: { type: Object },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = User;
