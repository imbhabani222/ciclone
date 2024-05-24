// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Post from "../../libs/models/posts";
import mongo from "../../libs/db";

export default async function handler(req, res) {
  try {
    await mongo();
    const { limit, post_type = "articles" } = req.query;
    const data = await Post.aggregate([
      {
        $match: {
          post_type: post_type,
        },
      },
      {
        $unwind: {
          path: "$tagList",
        },
      },
      {
        $group: {
          _id: "$tagList",
          articles: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          tagId: "$_id",
          _id: false,
          articles: true,
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagId",
          foreignField: "term_id",
          as: "tagData",
        },
      },
      {
        $unwind: {
          path: "$tagData",
        },
      },
      {
        $sort: {
          articles: -1,
        },
      },
      {
        $limit: +limit || 1000,
      },
    ]);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
}
