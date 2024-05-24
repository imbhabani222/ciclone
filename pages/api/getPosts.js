// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Post from "../../libs/models/posts";
import mongo from "./../../libs/db";
export default async function handler(req, res) {
  try {
    const { limit = 1000, page_number = 1, post_author, ...query } = req.query;
    const skip = (page_number - 1) * limit;
    await mongo();
    const match = { ...query };
    if (post_author) {
      match["post_author"] = +post_author;
    }
    console.log("match>>>",match);

    let postQuery = [
      {
        $match: {
          $and: [
            {...match},
            {post_status: { $ne: 'draft' }}
          ]
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "post_id",
          foreignField: "comment_post_ID",
          as: "comments",
        },
      },
      {
        $project: {
          post_title: 1,
          formatedData: 1,
          post_type: 1,
          post_date: 1,
          images: 1,
          post_status: 1,
          postData: 1,
          comments: {
            comment_author: 1,
            comment_author_email: 1,
            comment_author_url: 1,
            comment_date: 1,
            comment_content: 1,
            comment_approved: 1,
            user_id: 1,
          },
          post_content: 1,
          post_id: {
            $toInt: "$post_id",
          },
          post_author: {
            $toString: "$post_author",
          },
          tagList: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "post_author",
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
        $unwind: {
          path: "$author",
          includeArrayIndex: "a_version",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          post_title: 1,
          post_data: "$formatedData",
          post_type: 1,
          post_date: 1,
          images: 1,
          post_status: 1,
          postData: 1,
          comment_authors: 1,
          post_content: 1,
          post_id: 1,
          post_author: 1,
          comments: 1,
          author: {
            user_nicename: 1,
            user_url: 1,
            user_email: 1,
            user_id: 1,
            "user_meta_data.meta_key": 1,
            "user_meta_data.meta_value": 1,
          },
          tags: {
            name: 1,
            slug: 1,
          },
          tagNames: "$tags.name"
        },
      },
      {
        $addFields: {
          dateString: {
            $concat: [
              { $substr: ["$post_date", 8, 2] }, // Extract day of the month
              "-",
              { $substr: ["$post_date", 4, 3] }, // Extract month
              "-",
              { $substr: ["$post_date", 11, 4] }, // Extract year
              "T",
              { $substr: ["$post_date", 16, 8] }, // Extract time
              ".000Z", // Append milliseconds and UTC timezone
            ],
          },
        },
      },
      {
        $addFields: {
          parsedDate: {
            $dateFromString: {
              dateString: "$dateString",
            },
          },
        },
      },
      {
        $sort: {
          parsedDate: -1,
        },
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
    ]

    if(req.query.post_type && req.query.post_type === 'essentials'){
      postQuery.splice(7, 0, {$match: {
        tagNames: {$in:['Resources'],$nin: ['Miscellaneous'], $in: ['Opinion', 'Essentials']}
      }})
    }

    const data = await Post.aggregate(postQuery);
    const pageData = await Post.aggregate([
      { $match: match },
      { $group: { _id: null, count: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);

    // console.log("length>>>",data.length)

    const updateData = data.map((item) => {
      return {
        ...item,
        author: {
          ...item.author,
          first_name:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "first_name"
            )?.meta_value || null,
          last_name:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "last_name"
            )?.meta_value || null,
          description:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "description"
            )?.meta_value || null,
          _mailster_test_email:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "_mailster_test_email"
            )?.meta_value || null,
          about_me:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "about_me"
            )?.meta_value || null,
          city:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "city"
            )?.meta_value || null,
          nickname:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "nickname"
            )?.meta_value || null,
          about_me:
            item.author.user_meta_data.find(
              ({ meta_key }) => meta_key === "about_me"
            )?.meta_value || null,
        },
        imageData: {
          imageUrl: `https://hts-ci.s3.ap-south-1.amazonaws.com/files_mf/${
            item.postData.find((meta) => meta.meta_key === "post_image")
              ?.meta_value
          }`,
          img_caption: item.postData.find(
            (meta) => meta.meta_key === "img_caption"
          )?.meta_value,
          img_credits: item.postData.find(
            (meta) => meta.meta_key === "img_credits"
          )?.meta_value,
          img_title: item.postData.find((meta) => meta.meta_key === "img_title")
            ?.meta_value,
        },
      };
    });
    res.status(200).json({
      pageData: {
        totalObjects: pageData[0]?.count,
        totalPages: Math.ceil(pageData[0]?.count / limit) || 0,
        currentPage: page_number,
      },
      data: updateData.length > 0 ? updateData : "NO RECORDS MATCHED SEARCH",
      records_showing: data.length,
    });
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
}
