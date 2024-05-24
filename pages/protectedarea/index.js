import { Button, Col, Pagination, Row, Select } from "antd";
import React, { useState } from "react";
import styles from "./index.module.css";
import Img from "../../public/assets/images/homeImgs/protected-1.svg";
import ArrowRight from "../../public/assets/images/homeImgs/arrow-right-red.png";
import Img2 from "../../public/assets/images/homeImgs/topic-related.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import Image from "next/image";
import { useRouter } from "next/router";

function ProtetctedAreaList() {
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

  return (
    <div className={styles.container}>
      <div className={styles.main_heading}>
        Conservation India Protected Area
      </div>
      <div className={styles.red_line}></div>
      <div className={styles.main_sub_heading}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour.
      </div>

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
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <div
                onClick={() => router.push("/protectedarea-details")}
                key={index}
                className={styles.ci_home_articles_left_content_cards}
              >
                <div
                  className={styles.ci_home_articles_left_content_card_details}
                >
                  <div
                    className={styles.ci_home_articles_left_content_card_fline}
                  >
                    Forging Linkages Across Regions for the Wide-ranging Asian
                    Elephant
                  </div>
                  <div
                    className={styles.ci_home_articles_left_content_card_sline}
                  >
                    By Shekar Dattatri
                  </div>
                  <div
                    className={styles.ci_home_articles_left_content_card_tline}
                  >
                    Connectivity across habitats and animal populations is
                    critical to conservation. Connectivity is forged by animal
                    movements..
                  </div>
                  <div className={styles.btn_wrapper}>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className={styles.ci_home_articles_left_content_card_btn}
                    >
                      Invasive Species
                    </Button>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className={`${styles.ci_home_articles_left_content_card_btn}`}
                    >
                      Wildlife Tourism
                    </Button>
                  </div>
                </div>
                <div
                  className={
                    styles.ci_home_articles_left_content_card_img_wrapper
                  }
                >
                  <Image
                    alt="alt"
                    {...Img}
                    className={styles.ci_home_articles_left_content_card_img}
                  />
                </div>
              </div>
            );
          })}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={7}
          className={styles.ci_home_articles_right_content}
        >
          <div className={styles.sort_by_container}>
            {/* <div className={styles.sort_by_text}>SORT BY</div>
            <Select placeholder="Relevance">
              {[1, 2, 3].map((fr, index) => {
                return (
                  <Select.Option key={index} value={fr}>
                    {fr}
                  </Select.Option>
                );
              })}
            </Select> */}
          </div>
          <div className={styles.tips_more_title}>Tips and More</div>
          <div className={styles.tips_more_sub_title}>
            New to Conservation India? Here is a curated list of tips and
            educational reading material.
          </div>
          <div>
            {tipsAndMore.map((item, index) => {
              return (
                <div
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
            <Button
              className={styles.ci_home_essentials_right_section_view_more_btn}
            >
              View More
              <Image
                alt="alt"
                {...ArrowRight}
                className={styles.red_arrow_icon}
              />
            </Button>
          </div>
        </Col>
      </Row>

      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
      <div style={{ backgroundColor: "black", marginTop: "5%" }}>
        <CiHomeAskUs />
      </div>
    </div>
  );
}

export default ProtetctedAreaList;
