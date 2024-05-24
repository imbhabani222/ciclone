const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment_ID: { type: String },
    comment_post_ID: { type: String },
    comment_author: { type: String },
    comment_author_email: { type: String },
    comment_author_url: { type: String },
    comment_author_IP: { type: String },
    comment_date: { type: String },
    comment_date_gmt: { type: String },
    comment_content: { type: String },
    comment_karma: { type: String },
    comment_approved: { type: String },
    comment_agent: { type: String },
    comment_type: { type: String },
    comment_parent: { type: String },
    user_id: { type: String },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.comment || mongoose.model("comment", commentSchema);

module.exports = Comment;
