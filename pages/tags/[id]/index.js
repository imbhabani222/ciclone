import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../tags.module.css";
import { Row, Col, Button, Form, Select, Pagination, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ArrowRight from "../../../public/assets/images/homeImgs/arrow-right-red.png";
import rightarrow from "../../../public/assets/images/essentiallistImgs/rightarrow.svg";
import leftarrow from "../../../public/assets/images/essentiallistImgs/leftarrow.svg";
import img5 from "../../../public/assets/images/essentiallistImgs/essential-img5.svg";
import NoDataImg from "../../../public/no-image.png";
import NoData from "../../../public/no-search.svg";
import { useRouter } from "next/router";
import CiHomeAskUs from "../../../components/CiHomeAskUs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../components/Loader";
const { Option } = Select;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const res = await fetch(` http://localhost:3000/api/search?tags=${id}`);

  const data = await res.json();

  return { props: { data } };
}

const Tags = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tipsAndMore, setTipsAndMore] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);
  // const router = useRouter();
  const { id } = router.query;
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const tagApiCall = (id) => {
    setLoading(true);
    axios
      .get(` https://ci-demo.hutechweb.com/api/search?tags=${id}`)
      .then((res) => {
        console.log("res+++++", res);
        console.log("res----", res?.data?.data[0]);
        setTagsData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        console.log("err+++", err);
      });
  };

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = tagsData?.slice(
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
    tagApiCall(id);
    setVisible(true);
  }, []);

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
  return (
    <div className={styles.ci_home_essentials_container}>
      <div className={styles.ci_home_essentials_heading}>
        {/* {newData?.length} Results For {id} */}
        Some Results For{" "}
        {id
          ?.split("-")
          .map((item) => item?.[0].toUpperCase() + item?.slice(1))
          .join(" ")}
      </div>
      {newData?.length > 0 ? (
        <>
          <div
            className={styles.ci_home_essentials_heading_bottom_border}
          ></div>
          <div className={styles.ci_home_essentials_subheading}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour.
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
              {newData
                ?.filter((item) => item?.post_content !== "")
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
                  return (
                    <div
                      onClick={() => {
                        router.push(
                          `/${item?.post_type}-details/${
                            item.post_id
                          }?${item?.post_title?.split(" ").join("-")}`
                        );
                      }}
                      key={index}
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
                          By {item?.author[0]?.user_nicename}
                        </div>
                        <div
                          className={
                            styles.ci_home_essentials_left_content_card_tline
                          }
                          dangerouslySetInnerHTML={{
                            __html: item?.post_content,
                          }}
                        ></div>
                      </div>
                      <div
                        className={
                          styles.ci_home_essentials_left_content_card_img_wrapper
                        }
                      >
                        {filterImg.length > 0 ? (
                          filterImg?.map((elem, index) => {
                            if (index == 0) {
                              return (
                                <>
                                  <Image
                                    src={
                                      elem?.meta_value !== ""
                                        ? `https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`
                                        : NoDataImg
                                    }
                                    alt="alt"
                                    objectFit="fill"
                                    width={250}
                                    height={150}
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
                              src={NoDataImg}
                              alt="alt"
                              width={250}
                              height={150}
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
                      onClick={() => router.push("/tips")}
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
                  className={
                    styles.ci_home_essentials_right_section_view_more_btn
                  }
                >
                  View More
                  <Image
                    alt="alt"
                    {...ArrowRight}
                    className={styles.red_arrow_icon}
                  />
                </button>
              </div>
            </Col>
          </Row>
          {/* <div style={{ marginTop: "4%" }}>
            <CiHomeAskUs />
          </div> */}
        </>
      ) : (
        <div className={styles.nodata}>
          <Image {...NoData} alt="nodata" />
          <div>No Results found for {router?.query?.id} Tag</div>
        </div>
      )}
    </div>
  );
};

export default Tags;
