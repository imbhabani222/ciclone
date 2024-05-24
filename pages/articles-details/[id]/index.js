import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../articleDetails.module.css";
import Img from "../../../public/assets/images/articleDetailsImgs/top-img.svg";
import Img2 from "../../../public/assets/images/articleDetailsImgs/emperic-data.svg";
import Img3 from "../../../public/assets/images/articleDetailsImgs/img3.svg";
import UserImg from "../../../public/assets/images/articleDetailsImgs/user-img.svg";
import Blackbox from "../../../public/assets/images/socialIcons/blackbox.svg";
import FaceBookImg from "../../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedInImg from "../../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import TwitterImg from "../../../public/assets/images/socialIcons/twitter@2x.svg";
import { Row, Col, Button, Select, Input, Spin } from "antd";
import CiHomeSubscribe from "../../../components/CiHomeSubscribe";
import CiHomeAskUs from "../../../components/CiHomeAskUs";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import ErrorPage from "../../404";
import axios from "axios";

export const getServerSideProps = async (context) => {
  console.log(TwitterImg);
  const id = context?.params?.id;
  const res = await fetch(
    ` http://localhost:3000/api/getPosts?post_type=articles&post_id=${id}`
  );
  const data = await res.json();

  const commentRes = await fetch(
    ` http://localhost:3000/api/getComments?post_id=${id}`
  );
  const commentData = await commentRes.json();

  const authorRes = await fetch(
    ` http://localhost:3000/api/getPopularUser?limit=10`
  );
  const authorData = await authorRes.json();

  const tagRes = await fetch(
    ` http://localhost:3000/api/getTrendingTags?limit=10`
  );
  const tagData = await tagRes.json();

  return {
    props: {
      data,
      commentData,
      authorData,
      tagData,
    },
  };
};

function ArticleDetails(props) {
  console.log("artdetttttttttt", props);
  const params = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const [articleDetailsData, setArticleDetailsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log("id---.", id);
  // const article = useSelector((state) => state?.data?.listData || []);
  // const articleDetails1 = useSelector(
  //   (state) => state?.data?.articleDetails || []
  // );
  // const commentsData1 = useSelector(
  //   (state) => state?.data?.commentsData?.result?.data || []
  // );
  // const authorData1 = useSelector(
  //   (state) => state?.data?.authorsData?.result || []
  // );
  // const tagData1 = useSelector((state) => state?.data?.tagsData?.result || []);
  // console.log(tagData,"tagData");
  // const [number, setNumber] = useState(1);
  // const handlePage = (pageNumber) => setNumber(pageNumber);
  const [nodata, setNodata] = useState(null);

  // NO RECORDS MATCHED SEARCH

  console.log("params========", params);

  const articleApiCall = (id) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=articles&post_id=${id}`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setArticleDetailsData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const commentrelated = (id) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(` https://ci-demo.hutechweb.com/api/getComments?post_id=${id}`)
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setAuthorData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const relateduser = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(` https://ci-demo.hutechweb.com/api/getPopularUser?limit=10`)
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setAuthorData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const articletags = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(` https://ci-demo.hutechweb.com/api/getTrendingTags?limit=10`)
      .then((res) => {
        console.log("res+++++", res);
        console.log("taggg--res---", res?.data?.data);
        setTagData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  useEffect(() => {
    relateduser();
    articletags();
    commentrelated(id);
    setVisible(true);
    articleApiCall(id);
  }, []);

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = articleDetailsData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  let newDatanew = commentsData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  let newData1 = authorData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  let newDatatag = tagData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  console.log(newData);
  const handlePage = (pageNumber) => {
    setNumber(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          width: "85%",
          margin: "auto",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (nodata === "NO RECORDS MATCHED SEARCH") {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className={styles.article_details_wrapper}>
      {Array.isArray(newData) &&
        newData?.map((elem) => {
          const readTime = Math.round(elem?.post_data.split(" ").length / 60);
          const date = elem?.post_date?.split("G")[0];
          var options = { year: "numeric", month: "long", day: "numeric" };
          var today = new Date(date);
          var articleDate = today.toLocaleDateString("en-US", options);
          const filterImg = elem?.postData?.filter(
            (elem1) =>
              elem1?.meta_key == "_wp_attached_file" ||
              elem1.meta_key == "post_image"
          );
          const oldAuthor = `${elem?.author?.first_name}  ${elem?.author?.last_name}`;
          const newAuthor = elem?.postData?.filter(
            (elem) => elem?.meta_key == "post-auth"
          );
          const filterAuthor = newAuthor?.map((auth) =>
            auth?.meta_value ? auth?.meta_value : oldAuthor
          );
          const authorBio = elem?.postData?.filter(
            (elem) => elem?.meta_key == "post-auth-bio"
          );
          const oldDescription = elem?.author?.description;
          const filterDescription = authorBio?.map((bio) =>
            bio?.meta_value ? bio?.meta_value : oldDescription
          );
          const validation = filterDescription.every((val) => val != null);
          return (
            <>
              <div className={styles.top_container}>
                <div className={styles.top_container_published_date}>
                  {articleDate} • {readTime} min read
                </div>
                <div className={styles.top_container_heading}>
                  {elem.post_title}
                </div>
                <div
                  className={styles.top_container_heading_border_bottom}
                ></div>
                <div className={styles.top_container_author}>
                  By {filterAuthor}
                </div>
                {filterImg?.map((elem, index) => {
                  if (index == 0) {
                    return (
                      <>
                        <Image
                          src={`https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`}
                          alt="alt"
                          width={800}
                          height={500}
                          className={styles.top_container_img}
                        />
                      </>
                    );
                  }
                })}
              </div>
              <div className={styles.second_container}>
                <Row
                  justify="space-between"
                  className={styles.second_container_row}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className={styles.second_container_first_col}
                  >
                    <div className={styles.summery_heading}>SUMMERY</div>
                    <div className={styles.summery_details}>
                      <div
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          opacity: 1,
                        }}
                      >
                        Overview
                      </div>
                      {/* {result.map((str) => {
                        return (
                          <>
                            <div
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                              }}
                            >
                              {str}
                            </div>
                          </>
                        );
                      })} */}
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className={styles.second_container_second_col}
                  >
                    <div
                      className={styles.para1}
                      dangerouslySetInnerHTML={{ __html: elem?.post_data }}
                    />
                    <div className={styles.border_bottom_gray}></div>
                    {/* <div className={styles.tags}>
                      {elem?.tags?.map((elem2, index) => {
                        return (
                          <>
                            <Button
                              key={index}
                              onClick={() =>
                                params.push(`/tags/${elem2?.slug}`)
                              }
                            >
                              {elem2.name}
                            </Button>
                          </>
                        );
                      })}
                    </div> */}
                    {validation ? (
                      <>
                        {elem?.author?.user_id !== "1" && (
                          <div
                            className={styles.about_authors}
                            onClick={() =>
                              params.push(
                                `/authorDetails/${
                                  elem?.author?.user_id
                                }?${elem?.author?.first_name
                                  ?.split(" ")
                                  .join("-")}-${elem?.author?.last_name
                                  ?.split(" ")
                                  .join("-")}`
                              )
                            }
                          >
                            <div className={styles.author_title}>
                              About the authors
                            </div>
                            <div className={styles.author_border_bottom}></div>
                            <div className={styles.author_name}>
                              {filterAuthor}
                            </div>
                            <div
                              className={styles.author_detail}
                              dangerouslySetInnerHTML={{
                                __html: filterDescription,
                              }}
                            ></div>
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={6}
                    xl={6}
                    className={styles.second_container_third_col}
                  >
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...FaceBookImg} alt="FaceBookImg" />
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/cws/share?url=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...LinkedInImg} alt="LinkedInImg" />
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?text=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...TwitterImg} alt="TwitterImg" />
                    </a>
                  </Col>
                </Row>
                <div className={styles.long_hr}></div>
                <Row
                  justify="space-between"
                  className={styles.third_container_row}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={16}
                    xl={16}
                    className={styles.third_container_first_col}
                  >
                    {newDatanew?.length > 0 && Array.isArray(newDatanew)
                      ? newDatanew.map((item, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className={styles.third_conatiner_left_heading}
                              >
                                Comments
                              </div>
                              <div className={styles.comments_sortby}>
                                <div className={styles.number_of_comments}>
                                  {elem.comments.length} comments
                                </div>
                              </div>
                              <div className={styles.commented_member_details}>
                                <div>
                                  <Image
                                    {...UserImg}
                                    alt="UserImg"
                                    className={styles.commented_user_img}
                                  />
                                </div>
                                <div className={styles.user_name_comment}>
                                  <div className={styles.commented_user_name}>
                                    {item.comment_author}
                                  </div>
                                  <div
                                    className={styles.commented_text}
                                    dangerouslySetInnerHTML={{
                                      __html: item?.comment_content,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className={styles.border_bottom_gray}
                                style={{ marginTop: "5%" }}
                              ></div>
                            </>
                          );
                        })
                      : // commentsData
                        "  "}

                    {/* <div className={styles.add_comment}>
                      <Image
                        {...UserImg}
                        alt="UserImg"
                        className={styles.commented_user_img}
                      />
                      <Input placeholder="Add a comment..." />
                    </div> */}
                  </Col>
                  {1 !== 1 && (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={7}
                      xl={7}
                      className={styles.third_container_second_col}
                    >
                      <div className={styles.trending_tags_heading}>
                        Trending Tags
                      </div>
                      {displaySpinner(article)}
                      <div
                        className={styles.trending_tags}
                        style={{ marginTop: "20px" }}
                      >
                        {newDatatag &&
                          newDatatag.map((item, index) => {
                            return (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  params.push(
                                    `/tags/${item?.newDatatag?.slug}`
                                  );
                                }}
                                key={index}
                              >
                                {item.newDatatag.name}
                              </Button>
                            );
                          })}
                      </div>

                      {/* {1 !== 1 && (
                    <div className={styles.populer_authors}>
                      Popular Authors
                    </div>
                    <div className={styles.populer_authors_text}>
                      New to Conservation India? Here is a curated list of tips
                      and educational reading material.
                    </div>

                    {/* {displaySpinner(article)} */}

                      {/* {authorData &&
                      authorData?.map((item, index) => {
                        const fName =
                          item?.first_name?.charAt(0).toUpperCase() +
                          item?.first_name?.slice(1);
                        const lName =
                          item?.last_name?.charAt(0).toUpperCase() +
                          item?.last_name?.slice(1);
                        return (
                          <div key={index} className={styles.top_authors}>
                            <span className={styles.top_author_img}>
                              {fName.charAt(0)}
                            </span>
                            <div className={styles.top_author_details}>
                              <div className={styles.top_author_name}>
                                By {`${fName}  ${lName}`}
                              </div>
                              <div className={styles.top_author_numbers}>
                                {item.articles} Articles • 2 Case Studies
                              </div>
                            </div>
                          </div>
                        );
                      })} */}
                    </Col>
                  )}
                </Row>
              </div>
              <div className={styles.ask_us_container}>
                {/* <CiHomeAskUs /> */}
                <CiHomeSubscribe />
              </div>
            </>
          );
        })}

      {nodata !== "NO RECORDS MATCHED SEARCH" && <></>}
    </div>
  );
}

export default ArticleDetails;
