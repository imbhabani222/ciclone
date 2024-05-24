import React, { useState } from "react";
import styles from "./conservationTopics.module.css";
import {
  Col,
  Row,
  Form,
  Select,
  Card,
  Typography,
  Pagination,
  Spin,
} from "antd";
import Img from "../../public/assets/images/homeImgs/topic2.svg";
import Img2 from "../../public/assets/images/homeImgs/topic3.svg";
import SideImg from "../../public/assets/images/homeImgs/side-img.svg";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import RedRightArrow from "../../public/assets/images/homeImgs/arrow-right-red.png";
import CiHomeSubscribe from "../../components/CiHomeSubscribe";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NoImg from "../../public/no-img.png";
import Loader from "../../components/Loader";
import axios from "axios";

const { Option } = Select;
const { Meta } = Card;
const { Paragraph } = Typography;

export async function getServerSideProps(context) {
  const res = await fetch(
    " http://localhost:3000/api/getPosts?post_type=topics&limit=8"
  );

  const data = await res.json();
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

const ConservationTopics = (props) => {
  console.log("[[[", props);
  const router = useRouter();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [topicData, setTopicData] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    setTopics(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...LeftArrow} alt="Privious" height={48} width={48} />
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

  const topicsApiCall = () => {
    setTopics(true);
    axios
      .get(` https://ci-demo.hutechweb.com/api/getPosts?post_type=topics`)
      .then((res) => {
        // console.log("res+++++", res);
        setTopicData(res?.data?.data);
        setTopics(false);
        setVisible(false);
      })
      .catch((err) => {
        setTopics(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const postsPerPage = 9;
  const [number, setNumber] = useState(1);
  let newData = topicData?.slice(
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

  useEffect(() => {
    topicsApiCall();
    setVisible(true);
  }, []);

  if (topics) {
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
  console.log(newData, "ne---");
  return (
    <div className={styles.ci_home_topics_container}>
      <Typography className={styles.ci_home_topics_heading}>Topics</Typography>
      <div className={styles.ci_home_elinks_heading_bottom_border}></div>
      <Row gutter={[32, 32]}>
        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <p className={styles.ci_topics_heading}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour.
          </p>
        </Col> */}
        <Col xs={24} sm={24} md={4} lg={4} xl={4}></Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          {/* <h2 className={styles.head_sort}>Sort By</h2>
          <Form.Item name="sortBy">
            <Select defaultValue="last7days">
              <Option value="last7days">Last 7 days</Option>
              <Option value="last30days">Last 30 days</Option>
              <Option value="lastyear">Last year</Option>
            </Select>
          </Form.Item> */}
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        // justify="space-between"
        className={styles.ci_home_topics_card_container}
      >
        {newData?.map((item, index) => {
          const filterImg = item?.postData?.filter(
            (elem) =>
              elem.meta_key == "topic_image" || elem.meta_key == "post_image"
          );
          const topicsTags = item?.postData?.map((tag) =>
            tag?.meta_key == "topic_tags" ? tag?.meta_value : false
          );
          const topicsTagArray = Object.values(topicsTags);
          const filteredTopics = topicsTagArray.filter((elem) => elem != false);
          //dispatch({ type: "TOPICS_RELATED_DATA",tag: filteredTopics[0]});
          return (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={11}
              lg={8}
              xl={8}
              className={styles.ci_home_topics_antd_col}
              onClick={() =>
                router.push(
                  `topic-details/${item.post_id}?&tag="${filteredTopics[0]}"`
                )
              }
            >
              <div>
                {filterImg.length > 0 ? (
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
                            width={250}
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
                  })
                ) : (
                  <>
                    <Image
                      src={NoImg}
                      alt="alt"
                      width={250}
                      height={200}
                      objectFit="cover"
                      objectPosition="center"
                      className={styles.ci_home_articles_left_content_card_img}
                    />
                  </>
                )}
              </div>
              <div className={styles.ci_home_topics_card_img_details}>
                <div className={styles.ci_home_topics_card_img_details_heading}>
                  {item?.post_title}
                </div>
                <div className={styles.ci_home_topics_card_img_count}>
                  {/* {13} Articles • {2} Images */}
                </div>
                <div className={styles.ci_home_topics_card_line}></div>
              </div>
              <div className={styles.ci_home_topics_card_sub_cards_container}>
                {/* {[1, 2, 3].map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.ci_home_topics_card_sub_cards}>
                        <div
                          className={
                            styles.ci_home_topics_card_sub_cards_content
                          }
                        >
                          <div
                            className={
                              styles.ci_home_topics_card_sub_cards_content_heading
                            }
                          >
                            A Leopard’s Meal – the Ubiquitous Feral Dog
                          </div>
                          <div
                            className={
                              styles.ci_home_topics_card_sub_cards_content_sub_heading
                            }
                          >
                            Man’s so-called best friend is indeed the most
                            numerous ....
                          </div>
                        </div>
                        <div
                          className={styles.ci_home_topics_card_sub_cards_img}
                        >
                          <Image
                            alt="alt"
                            {...SideImg}
                            className={
                              styles.ci_home_topics_card_sub_cards_img_tag
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.topics_list_border}></div>
                    </div>
                  );
                })} */}
                {/* <div
                  onClick={() =>
                    router.push(
                      `topic-details/${item.post_id}?&tag="${filteredTopics[0]}"`
                    )
                  }
                  className={styles.ci_home_topics_card_sub_cards_view_more}
                >
                  View More
                </div> */}
              </div>
            </Col>
          );
        })}
      </Row>
      <div className={styles.pagination_div}>
        <Pagination
          className={styles.pagination}
          itemRender={itemRender}
          showTitle={false}
          defaultCurrent={1}
          pageSize={postsPerPage}
          total={topicData?.length}
          onChange={handlePage}
          showSizeChanger={false}
        />
      </div>

      <CiHomeSubscribe />
      {/* {console.log(sortTopics?.length)} */}
    </div>
  );
};

export default ConservationTopics;
