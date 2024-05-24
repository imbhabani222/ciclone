// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Post from "../../libs/models/posts";
import mongo from "../../libs/db";
export default async function handler(req, res) {
  try {
    const { limit = 10, page_number = 1, text, tags, post_type } = req.query;
    const skip = (page_number - 1) * limit;
    await mongo();
    let match = {
      $or: [
        { post_id: text },
        {
          "author.user_nicename": { $regex: text, $options: "i" },
        },
        {
          "author.user_meta_data.meta_key": "first_name",
          "author.user_meta_data.meta_value": {
            $regex: text,
            $options: "i",
          },
        },
        {
          "author.user_meta_data.meta_key": "last_name",
          "author.user_meta_data.meta_value": {
            $regex: text,
            $options: "i",
          },
        },
        {
          "author.user_email": { $regex: text, $options: "i" },
        },
        { post_title: { $regex: text, $options: "i" } },
      ],
    };
    if (tags) {
      match = { "tags.slug": { $in: tags?.split(",") } };
    }
    if (post_type) {
      match["post_type"] = post_type;
    }
    console.log(match);
    const data = await Post.aggregate([
      {
        $project: {
          _id: 0,
          post_id: 1,
          author_id: {
            $toString: "$post_author",
          },
          post_date: 1,
          post_date_gmt: 1,
          post_content: 1,
          formatedData: 1,
          postData: 1,
          tagList: 1,
          post_title: 1,
          post_type: 1,
          images: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "user_id",
          as: "author",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagList",
          foreignField: "term_id",
          as: "tags",
        },
      },
      {
        $project: {
          _id: 0,
          post_id: 1,
          // author_id: { $toString: "$post_author" },
          author_id: 1,
          post_date: 1,
          post_date_gmt: 1,
          post_content: 1,
          post_type: 1,
          formatedData: 1,
          post_title: 1,
          postData: 1,
          images: 1,
          tagList: 1,
          tags: {
            name: 1,
            slug: 1,
          },
          author: {
            user_nicename: 1,
            user_url: 1,
            user_email: 1,
            user_id: 1,
            user_meta_data: {
              meta_key: 1,
              meta_value: 1,
            },
          },
        },
      },
      {
        $sort: {
          post_id: 1,
        },
      },
      {
        $match: match,
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
    ]);

    const pageData = await Post.aggregate([
      {
        $project: {
          _id: 0,
          post_id: 1,
          author_id: {
            $toString: "$post_author",
          },
          post_date: 1,
          post_date_gmt: 1,
          post_content: 1,
          formatedData: 1,
          postData: 1,
          post_title: 1,
          post_type: 1,
          images: 1,
          tagList: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "user_id",
          as: "author",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagList",
          foreignField: "term_id",
          as: "tags",
        },
      },
      {
        $project: {
          _id: 0,
          post_id: 1,
          author_id: { $toString: "$post_author" },
          post_date: 1,
          post_date_gmt: 1,
          post_content: 1,
          post_type: 1,
          formatedData: 1,
          post_title: 1,
          postData: 1,
          images: 1,
          tags: {
            name: 1,
            slug: 1,
          },
          author: {
            user_nicename: 1,
            user_url: 1,
            user_email: 1,
            user_id: 1,
            user_meta_data: {
              meta_key: 1,
              meta_value: 1,
            },
          },
        },
      },
      {
        $sort: {
          post_id: 1,
        },
      },
      {
        $match: match,
      },
      {
        $group: {
          _id: "$post_type",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          post_type: "$_id",
          count: 1,
        },
      },
    ]);

    const total_found =
      pageData.reduce(
        (a, b) => {
          return { count: a.count + b.count };
        },
        {
          count: 0,
        }
      )?.count || 0;
    res.send({
      information: {
        total_found,
        groupData: pageData,
        page_data: {
          currentPage: page_number,
          currentlyShowing: limit,
          total_pages: Math.ceil(total_found / limit),
        },
      },
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
}
