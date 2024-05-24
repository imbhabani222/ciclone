import React, { useState, useEffect } from "react";
import { Col, Row, Typography, Button, Pagination, Select, Spin } from "antd";
import styles from "./article.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserImg from "../../public/assets/images/articleDetailsImgs/user-img.svg";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import RedDownArrow from "../../public/assets/images/essentiallistImgs/redDownArrow.svg";

import Image from "next/image";
import { useRouter } from "next/router";
import ReletedComponentSlider from "../../components/relatedComponent";
import sliderImg from "../../public/assets/images/slider.svg";
import Loader from "../../components/Loader";
import axios from "axios";

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:3000/api/getPosts?post_type=articles&limit=20`
  );
  const data = await res.json();
  const authorRes = await fetch(
    `http://localhost:3000/api/getPopularUser?limit=20`
  );
  const authorData = await authorRes.json();
  const tagsRes = await fetch(
    `http://localhost:3000/api/getTrendingTags?limit=20`
  );
  const tagsData = await tagsRes.json();
  return {
    props: {
      data: data,
      authorData: authorData,
      tagsData: tagsData,
    }, // will be passed to the page component as props
  };
}

function CiHomeLatestArticles(props) {
  console.log('"""""""""', props);
  const router = useRouter();
  const dispatch = useDispatch();
  let article1 = useSelector((state) => state?.data?.listData || []);
  const [article, setArticle] = useState([]);
  const [visible, setVisible] = useState(true);
  const [articleData, setArticleData] = useState([]);
  useEffect(() => {
    setArticle(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);
  const [authorData, setAuthorData] = useState([]);
  const authorData1 = useSelector(
    (state) => state?.data?.authorsData?.result || []
  );
  const [tagData, setTagData] = useState([]);
  const tagData1 = useSelector((state) => state?.data?.tagsData?.result || []);
  const [sliderData, setSliderData] = useState([
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
    {
      img: sliderImg,
      title: "Feral Dogs - Wildlife Conflicts",
      article_count: "13 Articles",
      img_count: "• 2 Images",
    },
  ]);

  // let sortArticle = article?.sort((first, second) => {
  //   if (first.post_id - second.post_id) return -1;
  // });
  const postsPerPage = 10;
  const [number, setNumber] = useState(1);

  const handlePage = (pageNumber) => {
    setNumber(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("pageNumber", "Pageno----");
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...LeftArrow} alt="Privious" />
        </a>
      );
    }

    if (type === "next") {
      return (
        <a>
          <Image {...RightArrow} alt="Next" />
        </a>
      );
    }

    return originalElement;
  };

  // let newData = sortArticle?.slice(
  //   (number - 1) * postsPerPage,
  //   postsPerPage * number
  // );
  useEffect(() => {
    setArticle(props?.data?.data);
    setAuthorData(props?.authorData);
    setTagData(props?.tagsData);
    // dispatch({ type: "FETCH_DATA" });
    // dispatch({ type: "FETCH_AUTHOR" });
    // dispatch({ type: "FETCH_TAGS" });
  }, [props]);

  const onChangeFilter = (e) => {};
  const tagArray = [];
  const tagCount = [];
  const filteredTags = [];
  const authArray = [];
  const authCount = [];
  const filterAuth = [];
  let uid1 = 0;
  let uid2 = 0;
  // sortArticle?.forEach((elem) =>
  //   elem.tags.map((elem2) => tagArray.push(elem2.name))
  // );
  // sortArticle?.forEach((elem) => authArray.push(elem?.author?.user_nicename));
  // tagArray.forEach((i) => {
  //   tagCount[i] = (tagCount[i] || 0) + 1;
  // });
  // authArray.forEach((i) => {
  //   authCount[i] = (authCount[i] || 0) + 1;
  // });
  const tagElements = Object.entries(tagCount);
  const authElements = Object.entries(authCount);
  const sortTags = tagElements.sort((first, second) => {
    if (first[1] > second[1]) return -1;
  });
  const sortAuth = authElements.sort((first, second) => {
    if (first[1] > second[1]) return -1;
  });

  sortTags.forEach(([key, value]) => {
    uid1++;
    uid1 < 11 ? filteredTags.push(key) : false;
  });
  sortAuth.forEach(([key, value]) => {
    uid2++;
    var value = key + "," + value;
    uid2 < 11 ? filterAuth.push(value) : false;
  });

  const articleApiCall = () => {
    setArticle(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=articles&limit=10`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setArticleData(res?.data?.data);
        setArticle(false);
        setVisible(false);
      })
      .catch((err) => {
        setArticle(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  // const postsPerPage = 9;
  // const [number, setNumber] = useState(1);
  let newData = articleData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  // console.log(newData);
  // const handlePage = (pageNumber) => {
  //   setNumber(pageNumber);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    articleApiCall();
    setVisible(true);
  }, []);

  if (article) {
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

  return (
    <div className={styles.ci_home_articles_container}>
      <Typography className={styles.ci_home_articles_heading}>
        Articles
      </Typography>
      <div className={styles.ci_home_articles_heading_bottom_border}></div>
      <Row className={styles.ci_home_articles_content}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={17}
          xl={17}
          justify="space-between"
          className={styles.ci_home_articles_left_content}
        >
          {newData?.map((item, index) => {
            const filterImg = item?.postData?.filter(
              (elem) =>
                elem.meta_key == "_wp_attached_file" ||
                elem.meta_key == "post_image"
            );
            const oldAuthor = `${item?.author?.first_name}  ${item?.author?.last_name}`;
            const newAuthor = item?.postData?.filter(
              (elem) => elem.meta_key == "post-auth"
            );
            const filterAuth = newAuthor?.map((auth) =>
              auth?.meta_value ? auth?.meta_value : oldAuthor
            );
            return item.post_status === "publish" ? (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `articles-details/${item.post_id}?${item?.post_title
                      ?.split(" ")
                      .join("-")}`
                  )
                }
                className={styles.ci_home_articles_left_content_cards}
              >
                <div
                  className={styles.ci_home_articles_left_content_card_details}
                >
                  <div
                    className={styles.ci_home_articles_left_content_card_fline}
                  >
                    {item?.post_title}
                  </div>
                  <div
                    className={styles.ci_home_articles_left_content_card_sline}
                  >
                    <span style={{ color: "black", opacity: 0.6 }}>By</span>{" "}
                    {filterAuth}
                  </div>
                  <div
                    id="article-listing"
                    className={styles.ci_home_articles_left_content_card_tline}
                    dangerouslySetInnerHTML={{ __html: item?.post_data }}
                  ></div>
                  <div className={styles.tag_wrapper}>
                    {item?.tags
                      ?.filter(
                        (item1) =>
                          item1?.name !== "Articles" &&
                          item1?.name !== "Featured Article" &&
                          item1?.name !== "Conservation Campaigns" &&
                          item1?.name !== "The Featured Posts"
                      )
                      ?.slice(0, 2)
                      ?.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            onClick={() => router.push(`/tags/${item?.slug}`)}
                            // onClick={(e) => e.stopPropagation()}
                            className={
                              styles.ci_home_articles_left_content_card_btn
                            }
                          >
                            {item.name}
                          </Button>
                        );
                      })}
                  </div>
                </div>
                <div
                  className={
                    styles.ci_home_articles_left_content_card_img_wrapper
                  }
                >
                  {filterImg?.map((elem, index) => {
                    if (index == 0) {
                      return (
                        <>
                          <Image
                            src={`https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`}
                            alt="alt"
                            width={300}
                            height={200}
                            objectFit="cover"
                            objectPosition="center"
                            className={
                              styles.ci_home_articles_left_content_card_img
                            }
                          />
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            ) : null;
          })}

          <div className={styles.pagination_div}>
            <Pagination
              className={styles.pagination}
              itemRender={itemRender}
              showTitle={false}
              defaultCurrent={1}
              pageSize={postsPerPage}
              total={article?.length}
              onChange={handlePage}
              showSizeChanger={false}
            />
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={7}
          className={styles.ci_home_articles_right_content}
        >
          {/* <div className={styles.sort_by}>SORT BY</div>
          <Select
            placeholder="Last 7 Days"
            style={{ width: "100%" }}
            onChange={(e) => onChangeFilter(e)}
          >
            {["Last 7 Days", "Last 15 Days", "Last 30 Days"].map(
              (fr, index) => {
                return (
                  <Select.Option key={index} value={fr}>
                    {fr}
                  </Select.Option>F
                );
              }
            )}
          </Select> */}
          <div className={styles.ci_home_articles_right_content_heading}>
            TRENDING TAGS
          </div>
          <div className={styles.ci_home_articles_right_content_tag_container}>
            {/* {console.log("tagdata+++++", tagData)} */}
            {tagData?.map((item, index) => {
              return (
                <>
                  {item?.tagData?.name &&
                    ![
                      "Articles",
                      "conservation campaigns",
                      "Featured Article",
                    ].includes(item?.tagData?.name) && (
                      <Button
                        key={index}
                        className={styles.ci_home_articles_right_content_tags}
                        onClick={() =>
                          router.push(`/tags/${item?.tagData?.slug}`)
                        }
                      >
                        {item?.tagData?.name}
                      </Button>
                    )}
                </>
              );
            })}
          </div>

          {/* <div className={styles.populer_authors}>Popular Authors</div>
          <div className={styles.populer_authors_text}>
            New to Conservation India? Here is a curated list of tips and
            educational reading material.
          </div>
          {authorData?.map((item, index) => {
            const fName =
              item?.first_name?.charAt(0).toUpperCase() +
              item?.first_name?.slice(1);
            const lName =
              item?.last_name?.charAt(0).toUpperCase() +
              item?.last_name?.slice(1);
            return (
              <div key={index} className={styles.top_authors}>
                <span className={styles.top_author_img}>
                  {fName?.charAt(0)}
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
      </Row>

      {/* <div className={styles.related_container}>
        <div className={styles.related_container_heading}>Related Topics</div>
        <div className={styles.ci_home_articles_heading_bottom_border}></div>
        <div className={styles.related_container_subheading}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour.
        </div>
      </div> */}

      {/* <ReletedComponentSlider data={sliderData} pageName="articlelist" /> */}
      <div style={{ marginTop: "3%" }}>{/* <CiHomeAskUs /> */}</div>
    </div>
  );
}

export default CiHomeLatestArticles;
