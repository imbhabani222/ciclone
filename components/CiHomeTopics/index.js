import { Button, Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import Img from "../../public/assets/images/homeImgs/topic-home.svg";
import Img2 from "../../public/assets/images/homeImgs/topic2.svg";
import Img3 from "../../public/assets/images/homeImgs/topic3.svg";
import SideImg from "../../public/assets/images/homeImgs/side-img.svg";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import Image from "next/image";
// import NoImg from "../../public/no-img.png";
import ReletedComponentSlider from "../relatedComponent";

const { Paragraph } = Typography;
function CiHomeTopics(props) {
  const router = useRouter();

  const [data, setData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27,
  ]);

  const [toNumber, setToNumber] = useState(3);
  const [fromNumber, setFromNumber] = useState(0);

  const showNext3 = () => {
    if (toNumber >= props?.topics?.length) {
      return;
    } else {
      setFromNumber(toNumber);
      setToNumber(toNumber + 3);
    }
  };
  const showPrev3 = () => {
    if (fromNumber == 0) {
      return;
    } else {
      setFromNumber(toNumber - 6);
      setToNumber(toNumber - 3);
    }
  };

  return (
    <div className={styles.ci_home_topics_container}>
      <Typography className={styles.ci_home_topics_heading}>Topics</Typography>
      <div className={styles.ci_home_elinks_heading_bottom_border}></div>
      <div className={styles.ci_home_topics_subheading}></div>
      <Row>
        <ReletedComponentSlider
          data={props?.topics?.slice(0, 9)}
          pageName="hometopic"
        />
      </Row>
      {/* <Row
        gutter={[24, 16]}
        // justify="space-between"
        className={styles.ci_home_topics_card_container}
      >
        {props?.topics
          ?.slice(fromNumber, toNumber)
        ?.map((item, index) => {
          if (index > 0 && index < 3) {
            const filterImg = item?.postData?.filter(
              (elem) =>
                elem.meta_key == "topic_image" || elem.meta_key == "post_image"
            );
            const topicsTags = item?.postData?.map((tag) =>
              tag?.meta_key == "topic_tags" ? tag?.meta_value : false
            );
            const topicsTagArray = Object.values(topicsTags);
            const filteredTopics = topicsTagArray.filter((elem) => elem != false); 

            return (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                className={styles.ci_home_topics_antd_col}
              >
                <div
                  className={styles.images}
                  key={index}
                  onClick={() => router.push(`topic-details/${item.post_id}?&tag="${filteredTopics[0]}"`)}
                // onClick={() => router.push(`topic-details/${item.post_id}`)}
                >
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
                              style={{ height: "236px", width: "100%" }}
                              className={styles.ci_home_topics_card_img}
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
                        style={{ height: "236px", width: "100%" }}
                        className={styles.ci_home_topics_card_img}
                      />
                    </>
                  )}
                </div>
                <div className={styles.ci_home_topics_card_img_details}>
                  <div
                    className={styles.ci_home_topics_card_img_details_heading}
                  >
                    {item?.post_title}
                  </div>
                  <div className={styles.ci_home_topics_card_img_count}>
                    {/* {13} Articles • {2} Images {item} */}
      {/* </div>
                  <div className={styles.ci_home_topics_card_line}></div>
                </div>
                <div className={styles.ci_home_topics_card_sub_cards_container}> */}
      {/* {[1, 2, 3]?.map((item, index) => {
                    return (
                      <>
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
                              // placeholder="blur"
                              alt="alt"
                              {...SideImg}
                              className={
                                styles.ci_home_topics_card_sub_cards_img_tag
                              }
                            />
                          </div>
                        </div>

                        <div className={styles.topics_list_border}></div>
                      </>
                    );
                  })} */}
      {/* <div
                    className={styles.ci_home_topics_card_sub_cards_view_more}
                    onClick={() => router.push(`/topic-details/${item?.post_id}`)}
                  >
                    View More
                  </div> */}
      {/* </div>
              </Col>
            );
          }
        })} */}
      {/* </Row> */}

      {/* <div className={styles.ci_home_slider_container}>
            <div className={styles.hide_arrow_btns}>
              <Image
                alt="alt"
                style={
                  fromNumber === 0
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
                {...LeftArrow}
                onClick={() => showPrev3()}
                className={styles.arrow_btns}
              />
              <Image
                alt="alt"
                {...RightArrow}
                onClick={() => showNext3()}
                className={`${styles.arrow_btns} ${styles.arrow_right}`}
              />
            </div>
            <button
              className={styles.ci_home_slider_viewmore}
              onClick={() => router.push("/topics")}
            >
              View More{" "}
              <Image
                alt="alt"
                // placeholder="blur"
                {...RedRightArrow}
                className={styles.arrow_red_icon}
              />
            </button>
          </div> */}
    </div>
  );
}

export default CiHomeTopics;
