import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Row,
  Col,
  Input,
  Layout,
  Result,
  Badge,
  Button,
  Select,
  Modal,
  Spin,
  DatePicker,
} from "antd";
import styles from "./searchPage.module.css";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
// import NoData from "../../public/assets/images/logo.svg";

import Img from "../../public/assets/images/essentiallistImgs/essential-img1.svg";
import Img2 from "../../public/assets/images/homeImgs/elink-sub.svg";
import NoData from "../../public/no-image.png";
import NoSearch from "../../public/no-search.svg";
import searchIcon from "../../public/assets/images/search-icon.svg";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import ArrowRight from "../../public/assets/images/homeImgs/arrow-right-red.png";
// import ConservationTopics from "../Topics/ConservationTopicsListing/ConservationTopics";

const SearchPage = () => {
  const dateFormat = "DD/MM/YYYY";
  const router = useRouter();
  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const [tipsAndMore, setTipsAndMore] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      searchApiCall();
    }
  };

  const searchApiCall = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(` https://ci-demo.hutechweb.com/api/search?text=${searchText}`)
      .then((res) => {
        setSearchData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
      });
  };

  useEffect(() => {
    setVisible(true);
    inputRef?.current?.focus();
  }, [router]);

  // console.log("useEffect++++++++++++", loading);
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
    <div
      style={
        !visible
          ? {
              marginTop: "10rem",
              position: "relative",
              width: "85%",
              marginInline: "auto",
            }
          : {
              filter: "blur(10px)",
              height: "136vh",
            }
      }
    >
      {searchData?.length > 0 && (
        <div className={styles.main_heading_wrapper}>
          <div className={styles.main_heading}>
            Showing results for “{searchText}”
          </div>
          <div className={styles.border_bottom}></div>
        </div>
      )}
      {searchData?.length > 0 ? (
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
            {searchData
              ?.filter((it) => it.post_content !== "")
              .map((item, index) => {
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
                    onClick={() =>
                      router.push(
                        `${item?.post_type}-details/${
                          item.post_id
                        }?${item?.post_title?.split(" ").join("-")}`
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
                        By {item?.author[0]?.user_nicename}
                      </div>
                      <div
                        className={
                          styles.ci_home_essentials_left_content_card_tline
                        }
                        dangerouslySetInnerHTML={{ __html: item?.post_content }}
                      ></div>
                      <div className={styles.tag_wrapper}>
                        {item?.tags?.slice(0, 2).map((item, index) => {
                          return (
                            <Button
                              key={index}
                              onClick={() => params.push(`/tags/${item.slug}`)}
                              className={
                                styles.ci_home_essentials_left_content_card_btn
                              }
                            >
                              {item?.name}
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
                            return (
                              <>
                                <Image
                                  src={
                                    elem?.meta_value !== ""
                                      ? `https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`
                                      : NoData
                                  }
                                  alt="alt"
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
                            src={NoData}
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
          </Col>{" "}
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
      ) : (
        <div className={styles.no_data}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              rowGap: "20px",
            }}
          >
            <Image {...NoSearch} alt="no" />
            <div className={styles.no_search_text}>No Search Result Found</div>
            <div className={styles.no_search_text_sub_heading}>
              We couldn’t find what you searched for. Try seraching again.
            </div>
          </div>
        </div>
      )}
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={490}
        height={800}
        footer={null}
        style={{
          position: "sticky",
          top: 0,
          marginTop: "9rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* <div className={styles.search_enter}>
            Type And Press “ENTER” To Search
          </div> */}
          <div style={{ display: "flex" }}>
            <Input
              ref={inputRef}
              autoFocus
              placeholder="Search..."
              onKeyUp={(e) => onEnterKeyPress(e)}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={() => searchApiCall()}
              style={{ backgroundColor: "#DA251C", color: "white" }}
            >
              Search
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchPage;
