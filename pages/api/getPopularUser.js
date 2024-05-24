// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Post from "../../libs/models/posts";
import mongo from "../../libs/db";

export default async function handler(req, res) {
  try {
    await mongo();
    const { limit } = req.query;
    const data = await Post.aggregate([
      {
        $group: {
          _id: "$post_author",
          articles: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: false,
          user_id: {
            $toString: "$_id",
          },
          articles: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          articles: 1,
          user_id: 1,
          user_nicename: "$result.user_nicename",
          user_email: "$result.user_email",
          user_meta_data: "$result.user_meta_data",
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
    const users = data.map((_user) => {
      return {
        ..._user,
        first_name:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "first_name")
            ?.meta_value || null,
        last_name:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "last_name")
            ?.meta_value || null,
        description:
          _user.user_meta_data.find(
            ({ meta_key }) => meta_key === "description"
          )?.meta_value || null,
        _mailster_test_email:
          _user.user_meta_data.find(
            ({ meta_key }) => meta_key === "_mailster_test_email"
          )?.meta_value || null,
        about_me:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "about_me")
            ?.meta_value || null,
        city:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "city")
            ?.meta_value || null,
        nickname:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "nickname")
            ?.meta_value || null,
        about_me:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "about_me")
            ?.meta_value || null,
      };
    });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
}
