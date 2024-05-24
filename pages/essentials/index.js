import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./essentialTips.module.css";
import { Row, Col, Button, Form, Select, Pagination, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ArrowRight from "../../public/assets/images/homeImgs/arrow-right-red.png";
import rightarrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import leftarrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import NoImg from "../../public/no-img.png";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../../components/Loader";
const { Option } = Select;

export async function getServerSideProps(context) {
  const res = await fetch(
    " http://localhost:3000/api/getPosts?post_type=essentials&limit=10"
  );
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

const Essentials = (props) => {
  console.log("props+++++++", props);
  const router = useRouter();
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...leftarrow} alt="Privious" />
        </a>
      );
    }

    if (type === "next") {
      return (
        <a>
          <Image {...rightarrow} alt="Next" />
        </a>
      );
    }

    return originalElement;
  };
  const [tipsAndMore, setTipsAndMore] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);
  const [essentialListingDatas, setEssentialListingDatas] = useState([]);
  // const [number, setNumber] = useState(1);
  const [visible, setVisible] = useState(true);
  const [essentialData, setEssentialData] = useState([]);
  const [loader, setLoader] = useState(false);
  // const postsPerPage = 10;
  useEffect(() => {
    setLoader(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);

  const essentialApiCall = () => {
    setLoader(true);
    axios
      .get(
        " https://ci-demo.hutechweb.com/api/getPosts?post_type=essentials&limit=10"
      )
      .then((res) => {
        // console.log("res+++++", res);
        setEssentialData(res?.data?.data);
        setLoader(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoader(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const postsPerPage = 9;
  const [number, setNumber] = useState(1);
  let newData = essentialData?.slice(
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
    //   setLoader(true);
    essentialApiCall();
    setVisible(true);
  }, []);

  if (loader) {
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
      <div className={styles.ci_home_essentials_heading}>Essentials</div>
      <div className={styles.ci_home_essentials_heading_bottom_border}></div>
      {/* <div className={styles.ci_home_essentials_subheading}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour.
      </div> */}
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
            ?.filter((elem) => elem?.post_id !== 347)
            ?.filter((elem) => elem?.post_content !== "")
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
              console.log(newData, "new----");
              const name =
                (item?.author?.first_name || "") +
                " " +
                (item?.author?.last_name || "");
              const filteredName = name
                .replace("Conservation India", "CI Team")
                .replace("Superadmin", "CI Team");
              return (
                <div
                  onClick={() =>
                    router.push(
                      `essentials-details/${item?.post_id}?${item?.post_title
                        ?.split(" ")
                        .join("-")}`
                    )
                  }
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
                    <div className={styles.tag_wrapper}>
                      {item?.tags
                        ?.filter(
                          (item1) =>
                            ![
                              "Resources",
                              "Essentials",
                              "Miscellaneous",
                              "conservation campaigns",
                            ].some((word) => item1?.name.includes(word))
                        )
                        ?.slice(0, 2)
                        ?.map((item1, index) => {
                          return (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/tags/${item1.slug}`);
                              }}
                              key={index}
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
                                objectFit="cover"
                                objectPosition="center"
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
                          height={200}
                          objectFit="cover"
                          objectPosition="center"
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
          {/* Temporary comments */}
          {/* <div className={styles.sort_by}>SORT BY</div>
          <Select placeholder="Relevance" style={{ width: "100%" }}>
            {["Last 7 Days", "Last 15 Days", "Last 30 Days"].map(
              (fr, index) => {
                return (
                  <Select.Option key={index} value={fr}>
                    {fr}
                  </Select.Option>
                );
              }
            )}
          </Select> */}
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
                    router.push({
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
                {...ArrowRight}
                className={styles.red_arrow_icon}
              />
            </button>
          </div>
        </Col>
      </Row>
      <div className={styles.paginatoin_div}>
        <Pagination
          className={styles.pagination}
          itemRender={itemRender}
          showTitle={false}
          defaultCurrent={1}
          pageSize={postsPerPage}
          total={essentialData?.length}
          onChange={handlePage}
          showSizeChanger={false}
        />
      </div>
      <div style={{ marginTop: "4%" }}>{/* <CiHomeAskUs /> */}</div>
    </div>
  );
};

export default Essentials;
