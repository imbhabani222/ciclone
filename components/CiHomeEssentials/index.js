import { Row, Col, Button } from "antd";
import React, { useState } from "react";
import styles from "./index.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Router from "next/router";
import NoImg from "../../public/no-img.png";
function CiHomeEssentials(props) {
  const router = useRouter();
  const [tipsAndMore, setTipsAndMore] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);
  const [toNumber, setToNumber] = useState(3);
  const [fromNumber, setFromNumber] = useState(0);

  const showNext3 = () => {
    if (toNumber >= props?.data?.length) {
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
    <div className={styles.ci_home_essentials_container}>
      <div className={styles.ci_home_essentials_heading}>Essentials</div>
      <div className={styles.ci_home_essentials_heading_bottom_border}></div>
      <div className={styles.ci_home_essentials_subheading}>
        {/* There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour. */}
      </div>
      <Row
        justify="space-between"
        className={styles.ci_home_essentials_container2}
      >
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={17}
          xl={17}
          className={styles.ci_home_essentials_card_container}
        >
          {props?.data
            ?.filter(
              (elem) => elem?.post_id !== "347" && elem?.post_content !== ""
            )
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
                    router.push(
                      `essentials-details/${item?.post_id}?${item?.post_title
                        ?.split(" ")
                        .join("-")}`
                    )
                  }
                  className={styles.ci_home_essentials_left_content_cards}
                >
                  <div
                    className={
                      styles.ci_home_essentials_left_content_card_details
                    }
                  >
                    <div
                      className={
                        styles.ci_home_essentials_left_content_card_fline
                      }
                    >
                      {item?.post_title}
                    </div>
                    <div
                      className={
                        styles.ci_home_essentials_left_content_card_sline
                      }
                    >
                      By {filteredName}
                    </div>
                    <div
                      className={
                        styles.ci_home_essentials_left_content_card_tline
                      }
                      dangerouslySetInnerHTML={{
                        __html: item?.post_content
                          .replace("Introduction", " ")
                          ?.slice(0, 200),
                      }}
                    ></div>
                    <div
                      className={
                        styles.ci_home_essentials_left_content_card_btn_wrapper
                      }
                    >
                      {item?.tags
                        ?.slice(0, 3)
                        ?.filter(
                          (item1) =>
                            ![
                              "Resources",
                              "Essentials",
                              "Miscellaneous",
                              "conservation campaigns",
                            ].some((word) => item1?.name.includes(word))
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
                                styles.ci_home_essentials_left_content_card_btn
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
                      styles.ci_home_essentials_left_content_card_img_wrapper
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
                                objectFit="cover"
                                objectPosition="center"
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
                          height={170}
                          className={
                            styles.ci_home_essentials_left_content_card_img
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
                // placeholder="blur"
                style={
                  fromNumber == 0
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
              onClick={() => router.push("/essentials")}
              className={styles.ci_home_slider_viewmore}
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
          md={8}
          lg={7}
          xl={7}
          className={styles.ci_home_essentials_card_tips_container}
        >
          <div className={styles.ci_home_essentials_right_heading}>
            Tips and More
          </div>
          <p className={styles.ci_home_essentials_right_sub_heading}>
            New to Conservation India? Here is a curated list of tips and
            educational reading material.
          </p>
          <div>
            {tipsAndMore.map((item, index) => {
              return (
                <div
                  onClick={() =>
                    Router.push({
                      pathname: "/tips",
                      query: { item, index: index + 1 },
                    })
                  }
                  key={index}
                  className={
                    styles.ci_home_essentials_right_section_tips_more_container
                  }
                >
                  <div
                    className={
                      styles.ci_home_essentials_right_section_tips_more
                    }
                  >
                    {item}
                  </div>
                  <div
                    className={
                      styles.ci_home_essentials_right_section_arrow_icon
                    }
                  >
                    <ArrowRightOutlined />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.view_more_btn_wrapper}>
            <button
              onClick={() => router.push("/tips")}
              className={styles.ci_home_essentials_right_section_view_more_btn}
            >
              View More
              <Image
                alt="alt"
                // placeholder="blur"
                {...RedRightArrow}
                className={styles.red_arrow_icon}
              />
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CiHomeEssentials;
// import React from "react";

// function CiHomeEssentials() {
//   return <div>CiHomeEssentials</div>;
// }

// export default CiHomeEssentials;
