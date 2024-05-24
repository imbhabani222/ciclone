import mongo from "../../libs/db";
import User from "../../libs/models/user";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const { query } = req;
    await mongo();
    const users = await User.aggregate([
      {
        $match: {
          ...query,
          $and: [
            {"user_meta_data.meta_key": "first_name"},
            {"user_meta_data.meta_key": "last_name"}
          ]
        },
      },
      {
        $project: {
          user_nicename: 1,
          user_email: 1,
          user_id: 1,
          "user_meta_data.meta_key": 1,
          "user_meta_data.meta_value": 1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    const data = users.map((_user) => {
      return {
        ..._user,
        first_name:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "first_name")
            ?.meta_value || null,
        last_name:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "last_name")
            ?.meta_value || null,
        description:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "description")
            ?.meta_value || null,
        _mailster_test_email:
          _user.user_meta_data.find(({ meta_key }) => meta_key === "_mailster_test_email")
            ?.meta_value || null,
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

    res.json(data);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
}
