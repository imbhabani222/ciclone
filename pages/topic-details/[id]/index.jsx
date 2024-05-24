import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../topicDetailsPage.module.css";
import { motion } from "framer-motion";
import {
  List,
  Col,
  Row,
  Form,
  Input,
  Select,
  Button,
  Avatar,
  Spin,
  Pagination,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import fileFolder from "../../../public/assets/images/topicDetailsImages/icon1@2x.svg";
import imageFolder from "../../../public/assets/images/topicDetailsImages/icon2@2x.svg";
import CiHomeSubscribe from "../../../components/CiHomeSubscribe";
``;
import CiHomeAskUs from "../../../components/CiHomeAskUs";
import LeftArrow from "../../../public/assets/images/homeImgs/left-arrow.png";
import RightArrow from "../../../public/assets/images/homeImgs/right-arrow.png";
import RedRightArrow from "../../../public/assets/images/Red-Arrow.svg";
import CreateIcon from "../../../public/assets/images/topicDetailsImages/createicon.svg";
import Topicimages from "../../../public/assets/images/topicDetailsImages/topicdetails-img1.svg";
import ReletedComponentSlider from "../../../components/relatedComponent";
import Img from "../../../public/assets/images/homeImgs/slider1.svg";
import Img2 from "../../../public/assets/images/homeImgs/slider2.svg";
import Img3 from "../../../public/assets/images/homeImgs/slider3.svg";
import Topicdetailsimg from "../../../public/assets/images/topicDetailsImages/topicdetailsimg.svg";
import DownArrow from "../../../public/assets/images/topicDetailsImages/down-arrows.svg";
import DownAroowIcon from "../../../public/assets/images/topicDetailsImages/down-arrow-iocn@2x.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import NoImg from "";
import Loader from "../../../components/Loader";
import axios from "axios";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const relatedTag = context?.query?.tag?.replace(/["']/g, "");
  const da = await fetch(

    ` http://localhost:3000/api/getPosts?post_type=topics&post_id=${id}`
  );
  const data = await da.json();

  const trendingTagRes = await fetch(

    ` http://localhost:3000/api/getTrendingTags?limit=10&post_type=articles`
  );
  const trendingTagData = await trendingTagRes.json();

  const authorRes = await fetch(

    ` http://localhost:3000/api/getPopularUser?limit=10`

  );
  const authorData = await authorRes.json();

  const relatedArticle = await fetch(

    ` http://localhost:3000/api/search?tags=${relatedTag}&post_type=articles`

  );
  const relatedArticleData = await relatedArticle.json();

  const relatedImg = await fetch(

    ` http://localhost:3000/api/search?tags=${relatedTag}&post_type=articles`

  );
  const relatedImgData = await relatedImg.json();
  return {
    props: {
      // data,
      trendingTagData,
      authorData,
      relatedArticleData,
      relatedImgData,
      tags: data,
    },
  };
}

const { Option } = Select;
const TopicDetailsPage = (props) => {
  console.log("topicdetttttttttt", props);
  // const [number, setNumber] = useState(1);
  const [visible, setVisible] = useState(true);
  const [topicsDetails, setTopicsDetails] = useState([]);
  useEffect(() => {
    setTopicsDetails(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
    console.log(props, "FFFFFFFFFFFFFFFFFFFFFF");
  }, [props]);
  console.log("propss--->", setTopicsDetails);
  const [loading, setLoading] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const [trendingTagData, setTrendingTagData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [topicsRelatedData, setTopicsRelatedData] = useState([]);
  const [relatedArticleData, setRelatedArticleData] = useState([]);
  const [topicsRelatedImg, settopicsRelatedImg] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  console.log("id---.", id);
  const relatedTag = router?.query?.tag;
  console.log("tag---->", relatedTag);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const relatedTopicsApiCall = (id) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=topics&post_id=${id}`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setTopicData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const relatedapi = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getTrendingTags?limit=10&post_type=articles`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setTopicsRelatedData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const relatedauth = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian

      .get(
        ` https://ci-demo.hutechweb.com/api/getPopularUser?limit=10`
      )

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

  const relatedarticle = (relatedTag) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/search?tags=${relatedTag}&post_type=articles`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("taggg--res---", res?.data?.data);
        setRelatedArticleData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const relatedimg = (relatedTag) => {
    setLoading(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/search?tags=${relatedTag}&post_type=articles`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("taggg--res---", res?.data?.data);
        settopicsRelatedImg(res?.data?.data);
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
    // setImageDetails(props?.data?.data);
    relatedarticle(relatedTag?.replace(/["']/g, ""));
    relatedapi();
    relatedauth();
    relatedTopicsApiCall(id);
    setVisible(true);
    relatedimg(relatedTag?.replace(/["']/g, ""));
    // dispatch({ type: "FETCH_IMAGE_DETAILS", post_id: params.query.id });
  }, []);

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = topicData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  let newDatanew = topicsRelatedData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  let newData1 = authorData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  let newDatatag = relatedArticleData;
  let newDataimg = topicsRelatedImg?.slice(
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

  return (
    <div className={styles.topic_details_page}>
      <div className={styles.topic_details_card}>
        <List itemLayout="vertical" size="large">
          {Array.isArray(newData) &&
            newData?.map((item) => {
              console.log("find--->", newData);
              const filterImg = item?.postData?.filter(
                (elem) =>
                  elem.meta_key == "topic_image" ||
                  elem.meta_key == "post_image"
              );
              // const datanew = topicsDetails?.result?.data;
              const uniqueArray = newData.filter((item, index) => {
                return newData.indexOf(item) === index;
              });
              console.log(uniqueArray, "uniqueArray");
              return (
                <>
                  <List.Item
                    key={item.post_title}
                    extra={
                      filterImg.length > 0 ? (
                        filterImg?.map((img, index) => {
                          if (index == 0) {
                            return (
                              <>
                                <Image
                                  src={
                                    img?.meta_value !== ""
                                      ? `https://www.conservationindia.org/wp-content/files_mf/${img.meta_value}`
                                      : NoImg
                                  }
                                  alt="alt"
                                  width={500}
                                  height={400}
                                  className={styles.topic_details_responsive}
                                />
                              </>
                            );
                          }
                        })
                      ) : (
                        <>
                          <Image
                            src={NoImg}
                            alt="alt"
                            width={500}
                            height={400}
                            className={styles.topic_details_responsive}
                          />
                        </>
                      )
                    }
                  >
                    <List.Item.Meta
                      title={
                        <p className={styles.titles_data}>{item.post_title} </p>
                      }
                    />
                    <div
                      className={styles.topic_details_page_images_bottom_border}
                    ></div>
                    <p
                      className={styles.topic_details_content}
                      dangerouslySetInnerHTML={{ __html: item?.post_data }}
                    />
                    <div className={styles.topic_details_sub_card}>
                      <div
                        className={styles.topic_details_article_images_section}
                      >
                        <div className={styles.div1}>
                          <Image alt="file" {...fileFolder} className="" />
                        </div>
                        <div className={styles.topic_details_file}>
                          <p className={styles.topic_details_integer}>
                            {newDatatag?.length}
                          </p>
                          <p className={styles.topic_details_sub_article}>
                            Articles
                          </p>
                        </div>
                      </div>

                      {/* <div
                        className={styles.topic_details_article_images_section1}
                      >
                        <div className={styles.div1}>
                          <Image
                            alt="imageFolder"
                            {...imageFolder}
                            className=""
                          />
                        </div>
                        <div className={styles.topic_details_file}>
                          <p className={styles.topic_details_integer}>
                            {newDataimg?.length}
                          </p>
                          <p className={styles.topic_details_sub_article}>
                            Images
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </List.Item>
                </>
              );
            })}
        </List>
      </div>

      {/* <div className={styles.topic_details_images}>
        <h2 className={styles.ci_heading}>Images</h2>
        <div className={styles.topic_details_page_images_bottom_border}></div>

        <ReletedComponentSlider data={newDataimg} pageName="topicimage" />
      </div> */}

      <div className={styles.ci_article_section}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <h3 className={styles.ci_heading}>Articles</h3>
            <div
              className={styles.topic_details_page_article_bottom_border}
            ></div>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
            xl={16}
            className={styles.list_title}
          >
            {newDatatag?.map((item, index) => {
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
                auth?.meta_value ? auth?.meta_value : ""
              );
              return (
                <div
                  key={index}
                  className={styles.ci_home_articles_left_content_cards}
                  onClick={() =>
                    params.push(`/${item.post_type}-details/${item.post_id}`)
                  }
                >
                  <div
                    className={
                      styles.ci_home_articles_left_content_card_details
                    }
                  >
                    <div
                      className={
                        styles.ci_home_articles_left_content_card_fline
                      }
                    >
                      {item?.post_title}
                    </div>
                    <div
                      className={
                        styles.ci_home_articles_left_content_card_sline
                      }
                    >
                      {filterAuth}
                    </div>
                    <div
                      className={
                        styles.ci_home_articles_left_content_card_tline
                      }
                      dangerouslySetInnerHTML={{ __html: item?.post_content }}
                    />
                    <div className={styles.btn_wrapper}>
                      {item?.tags?.slice(0, 2)?.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              params.push(`/tags/${item?.slug}`);
                            }}
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
                              alt="Topicimages"
                              width={240}
                              height={150}
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
              );
            })}
            <div style={{ marginTop: "5%" }}>
              <Pagination
                className={styles.pagination}
                itemRender={itemRender}
                showTitle={false}
                defaultCurrent={1}
                pageSize={postsPerPage}
                total={newData?.length}
                onChange={handlePage}
                showSizeChanger={false}
              />
            </div>
          </Col>
          {1 !== 1 && (
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              className={styles.related_title}
            >
              <p className={styles.related_topic}>TRENDING TAGS</p>
              <div
                className={styles.ci_home_articles_right_content_tag_container}
              >
                {newDatanew?.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      className={styles.ci_home_articles_right_content_tags}
                      onClick={() =>
                        params.push(`/tags/${item?.tagData?.slug}`)
                      }
                    >
                      {item.tagData.name}
                    </Button>
                  );
                  {
                    (" ");
                  }
                })}
              </div>
              <p className={styles.topic_details_authors}>Popular Authors</p>
              <p className={styles.topic_details_subparagraph}>
                New to Conservation India? Here is a curated list of tips and
                educational reading material.
              </p>
              <List
                itemLayout="horizontal"
                dataSource={newData1}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      params.push(`/authorDetails/${item?.user_id}`)
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <span className={styles.auth_name_img}>
                          {item?.first_name?.charAt(0).toUpperCase()}
                        </span>
                      }
                      title={
                        <p href="">
                          {item?.first_name?.charAt(0).toUpperCase() +
                            item?.first_name?.slice(1) +
                            " " +
                            item?.last_name?.charAt(0).toUpperCase() +
                            item?.last_name?.slice(1)}
                        </p>
                      }
                      description={`${item.articles} Articles • `}
                    />
                  </List.Item>
                )}
              />
            </Col>
          )}
        </Row>
      </div>

      {/* <CiHomeAskUs /> */}
      <CiHomeSubscribe />
    </div>
  );
};

export default TopicDetailsPage;
