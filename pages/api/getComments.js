// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from "../../libs/db";
import Comment from "../../libs/models/tags";
export default async function handler(req, res) {
  try {
    const { limit = 10, page_number = 1, post_id } = req.query;
    const skip = (page_number - 1) * limit;
    await mongo();
    const data = await Comment.aggregate([
      {
        $match: {
          comment_post_ID: post_id,
        },
      },
      {
        $project: {
          comment_author: 1,
          comment_author_email: 1,
          comment_author_url: 1,
          comment_date: 1,
          comment_content: 1,
          comment_approved: 1,
          comment_ID: 1,
          user_id: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "author",
        },
      },
      {
        $project: {
          comment_author: 1,
          comment_author_email: 1,
          comment_author_url: 1,
          comment_date: 1,
          comment_content: 1,
          comment_approved: 1,
          comment_ID: {
            $toInt: "$comment_ID",
          },
          author: {
            user_nicename: 1,
            user_url: 1,
            user_email: 1,
          },
        },
      },
      {
        $sort: {
          comment_ID: 1,
        },
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
    ]);
    const pageData = await Comment.aggregate([
      { $match: { comment_post_ID: post_id } },
      { $group: { _id: null, count: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      pageData: {
        totalObjects: pageData[0]?.count,
        totalPages: Math.ceil(pageData[0]?.count / limit) || 0,
        currentPage: page_number,
      },
      data: data.length > 0 ? data : "NO RECORDS MATCHED SEARCH",
      records_showing: data.length,
    });
  } catch (err) {
    console.log(err);
  }
}
