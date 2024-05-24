import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./index.module.css";
import LeftImg from "../../public/assets/images/homeImgs/cihomefeatured-left.png";
import LeftImg2 from "../../public/assets/images/homeImgs/fa2.svg";
import LeftImg3 from "../../public/assets/images/homeImgs/fa3.svg";
import LeftImg1 from "../../public/assets/images/homeImgs/arrow-right-red.png";
import { Typography, Row, Col, AutoComplete } from "antd";
import Image from "next/image";
import NoImg from "../../public/no-img.png";
import { AlignCenterOutlined } from "@ant-design/icons";

function CiHomeFeatured(props) {
  const router = useRouter();

  // console.log("firstArticle_______", props?.imagesFetchData);
  return (
    <div className={styles.ci_home_featured_container}>
      <div className={styles.ci_home_featured_heading}>PhotoFeatures</div>
      <div className={styles.ci_home_featured_heading_bottom_border}></div>
      <Row
        gutter={[32, 32]}
        justify="space-between"
        className={styles.ci_home_featured_content}
      >
        {props?.imagesFetchData?.slice(3, 4)?.map((item, index) => {
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

          return (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={12}
              className={styles.ci_home_featured_left}
              onClick={() =>
                router.push(
                  `/gallery-details/${item?.post_id}?${item?.post_title
                    ?.split(" ")
                    .join("-")}`
                )
              }
            >
              <div className={styles.ci_home_featured_left_img_wrapper}>
                {filterImg?.length > 0 ? (
                  filterImg?.map((elem, index) => {
                    if (index == 0) {
                      // console.log("ellll", elem.meta_value);
                      return (
                        <>
                          <Image
                            blurDataURL="/article-bg.png"
                            src={
                              elem?.meta_value !== ""
                                ? `https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`
                                : NoImg
                            }
                            alt="alt"
                            objectFit="cover"
                            objectPosition="center"
                            width={250}
                            height={350}
                            className={styles.ci_home_featured_left_img}
                          />
                        </>
                      );
                    }
                  })
                ) : (
                  <>
                    <Image
                      blurDataURL="/article-bg.png"
                      src={NoImg}
                      alt="alt"
                      width={250}
                      height={390}
                      className={styles.ci_home_featured_left_img}
                    />
                  </>
                )}
              </div>
              <div className={styles.ci_home_featured_left_text_wrapper}>
                <div className={styles.red_line}></div>
                <div className={styles.ci_home_featured_left_text_heading}>
                  PhotoFeatures
                </div>
                <div className={styles.ci_home_featured_left_text_sub_heading}>
                  {item?.post_title}
                </div>
                <div
                  className={styles.ci_home_featured_left_text_end_line}
                  dangerouslySetInnerHTML={{ __html: item?.post_content }}
                ></div>
              </div>
            </Col>
          );
        })}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={12}
          className={styles.ci_home_featured_right}
        >
          <Row
            gutter={[32, 32]}
            justify="space-between"
            className={styles.ci_home_featured_right_card_wrapper}
          >
            {[props?.firstArticle[8], props?.firstCampaign[1]].map(
              (item, index) => {
                // console.log("item", item);

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

                return (
                  <Col
                    key={index}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    className={styles.ci_home_featured_right_card}
                    onClick={() =>
                      router.push(
                        `${
                          index === 0
                            ? `articles-details/${
                                item?.post_id
                              }?${item?.post_title?.split(" ").join("-")}`
                            : `/campaign-details/${
                                item?.post_id
                              }?${item?.post_title?.split(" ").join("-")}`
                        }`
                      )
                    }
                  >
                    <div style={{ position: "relative" }}>
                      {filterImg?.length > 0 ? (
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
                                  objectFit="cover"
                                  objectPosition={AlignCenterOutlined}
                                  width={250}
                                  height={200}
                                  className={
                                    styles.ci_home_essentials_left_content_card_img
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
                            height={190}
                            className={
                              styles.ci_home_essentials_left_content_card_img
                            }
                          />
                        </>
                      )}
                      {/* {index === 1 && (
                        <div className={styles.active_campaigns}>
                          Active Campaign
                        </div>
                      )} */}
                    </div>
                    <div
                      className={styles.ci_home_featured_right_card_container}
                    >
                      <div style={{ paddingTop: "6%" }}>
                        {index == 0 ? "Spotlight" : "featured campaign"}
                      </div>
                      <p className={styles.ci_home_featured_right_card_text}>
                        {item?.post_title ?? "null"}
                      </p>
                    </div>
                  </Col>
                );
              }
            )}
          </Row>
          <Row className={styles.ci_home_featured_right_text_wrapper}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className={styles.ci_home_featured_right_text_first}>
                Trending News
              </div>

              <div className={styles.ci_home_featured_right_text_second}>
                <a
                  href="https://timesofindia.indiatimes.com/city/bhopal/leopard-found-dead-in-madhya-pradesh-claws-whiskers-removed/articleshow/89814389.cms?frmapp=yes"
                  target={"_blank"}
                  rel="noopener noreferrer"
                  style={{ color: "#1F1A17" }}
                >
                  Leopard found dead in Madhya Pradesh, claws; whiskers removed
                  –{" "}
                </a>
                <span style={{ color: "red" }}>Times of India</span>
              </div>
              <div className={styles.ci_home_featured_right_text_third}>
                A leopard was found dead in Manpur forest range near Mhow,
                raising suspicion that a gang of poachers is active in the
                area...
              </div>
              <div className={styles.ci_home_featured_right_text_fourth}>
                February 25, 2022
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CiHomeFeatured;
