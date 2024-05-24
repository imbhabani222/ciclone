const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post_author: { type: Number },
    post_date: { type: String },
    post_date_gmt: { type: String },
    post_content: { type: String },
    post_title: { type: String },
    post_excerpt: { type: String },
    post_status: { type: String },
    comment_status: { type: String },
    ping_status: { type: String },
    post_password: { type: String },
    post_name: { type: String },
    to_ping: { type: String },
    pinged: { type: String },
    post_modified: { type: String },
    post_modified_gmt: { type: String },
    post_content_filtered: { type: String },
    post_parent: { type: String },
    guid: { type: String },
    menu_order: { type: String },
    post_type: { type: String },
    post_mime_type: { type: String },
    comment_count: { type: String },
    formatedData: { type: String },
    post_id: { type: String },
    postData: { type: Object },
    images: { type: Object },
    tagList: { type: Object },
  },
  { timestamps: true }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);

module.exports = Post;
