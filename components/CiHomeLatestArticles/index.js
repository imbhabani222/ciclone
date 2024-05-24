import { Col, Row, Typography, Button, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Img from "../../public/assets/images/homeImgs/larticle.svg";
import Img2 from "../../public/assets/images/homeImgs/larticle2.svg";
import Img3 from "../../public/assets/images/homeImgs/larticle3.svg";
import Img4 from "../../public/assets/images/homeImgs/larticle4.svg";
import BackgroundImg from "../../public/assets/images/homeImgs/article-bg.png";
// import ArrowRight from "../../public/assets/images/homeImgs/arrow-right-red.png";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import Image from "next/image";
import NoImg from "../../public/no-img.png";
import { useRouter } from "next/router";

function CiHomeLatestArticles(props) {
  const router = useRouter();
  const [toNumber, setToNumber] = useState(3);
  const [fromNumber, setFromNumber] = useState(0);
  const showNext3 = () => {
    if (toNumber >= props?.article?.length) {
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
  useEffect(() => {
    console.log(props, "props....");
  }, []);
  return (
    <div className={styles.ci_home_articles_container}>
      <Typography className={styles.ci_home_articles_heading}>
        Latest Articles
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
          {props?.article
            ?.filter((elem) => elem?.post_content !== "")
            ?.slice(fromNumber, toNumber)
            ?.map((item, index) => {
              const filterImg = item?.postData?.filter((elem) => {
                if (
                  elem?.meta_key === "_wp_attached_file" &&
                  elem?.meta_value !== ""
                ) {
                  return elem;
                } else if (elem.meta_key == "post_image") {
                  return elem;
                }
              });
              const name =
                (item?.author?.first_name || "") +
                " " +
                (item?.author?.last_name || "");
              const filteredName = name
                .replace("Conservation India", "ci team")
                .replace("Superadmin", "ci team");
              return (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`articles-details/${item?.post_id}`)
                  }
                  className={styles.ci_home_articles_left_content_cards}
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
                      {/* {item?.author?.nickname}  */}
                      By {filteredName}
                      {/* {item?.author?.nickname} {item?.author?.last_name} */}
                    </div>
                    <div
                      className={
                        styles.ci_home_articles_left_content_card_tline
                      }
                      dangerouslySetInnerHTML={{ __html: item?.post_content }}
                    ></div>
                    <div className={styles.tag_wrapper}>
                      {item?.tags
                        ?.slice(0, 3)
                        ?.filter(
                          (item1) =>
                            item1?.name !== "Articles" &&
                            item1?.name !== "Featured Article" &&
                            item1?.name !== "Conservation Campaigns" &&
                            item1?.name !== "The Featured Posts"
                        )
                        ?.map((item1, index) => {
                          return (
                            <Button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/tags/${item1?.slug}`);
                              }}
                              className={
                                styles.ci_home_articles_left_content_card_btn
                              }
                            >
                              {item1?.name}
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
                    {filterImg.length > 0 ? (
                      filterImg?.map((elem, index) => {
                        if (index == 0) {
                          // console.log("ellll", elem.meta_value);
                          return (
                            <>
                              <Image
                                src={
                                  elem?.meta_value !== ""
                                    ? `https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`
                                    : NoImg
                                }
                                alt="alt"
                                width={250}
                                height={200}
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
                          height={170}
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          <div className={styles.ci_home_slider_container}>
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
                style={
                  toNumber >= props?.data?.length
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
                // placeholder="blur"
                {...RightArrow}
                onClick={() => showNext3()}
                className={`${styles.arrow_btns} ${styles.arrow_right}`}
              />
            </div>
            <button
              className={styles.ci_home_slider_viewmore}
              onClick={() => router.push("/articles")}
            >
              View More{" "}
              <Image
                alt="alt"
                // placeholder="blur"
                {...RedRightArrow}
                className={styles.arrow_red_icon}
              />
            </button>
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
          <div className={styles.ci_home_articles_right_content_heading}>
            TRENDING TAGS
          </div>
          <div className={styles.ci_home_articles_right_content_tag_container}>
            {props?.tag?.map((item, index) => {
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
          {/* <div
            className={styles.ci_home_articles_right_content_ask_us}
            style={{
              backgroundImage: `url('/article-bg.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: "8%",
            }}
          >
            <div
              className={styles.ci_home_articles_right_content_ask_us_heading}
            >
              Ask CI
            </div>
            <div
              className={
                styles.ci_home_articles_right_content_ask_us_heading_bottom_line
              }
            ></div>
            <div
              className={styles.ci_home_articles_right_content_ask_us_content}
            >
              Ask us any question related to wildlife conservation in India and
              we will answer it after consulting with our panel of experts.
            </div>
            <div className={styles.button_container}>
              <button
                className={styles.ci_home_articles_right_content_ask_us_btn}
              >
                Click here{" "}
                <Image
                  alt="alt"
                  // placeholder="blur"
                  {...RedRightArrow}
                  className={styles.ask_us_btn}
                />
              </button>
            </div>
          </div> */}
        </Col>
      </Row>
    </div>
  );
}

export default CiHomeLatestArticles;
