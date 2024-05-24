import React from "react";
import styles from "./index.module.css";
import { Row, Col, Input, Button } from "antd";
import CameraIcon from "../../public/assets/images/homeImgs/camera.svg";
import EditIcon from "../../public/assets/images/homeImgs/edit.svg";
import Image from "next/image";

function CiHomeConnect() {
  return (
    <div className={styles.ci_home_connect_container}>
      <div className={styles.ci_home_connect_heading_container}>
        <div className={styles.ci_home_connect_heading}>Conservation India</div>
        <div className={styles.ci_home_connect_heading_bottom_border}></div>
      </div>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={17}
          xl={17}
          className={styles.ci_home_connect_subheading}
        >
          CI is an entirely{" "}
          <span style={{ color: "red" }}>
            volunteer-driven, non-profit, non-sponsored{" "}
          </span>
          portal that aims to facilitate{" "}
          <span style={{ color: "red" }}>nature conservation</span> by providing
          reliable information as well as the practical knowledge needed to act
          effectively.
        </Col>
      </Row>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={4}
          lg={4}
          xl={4}
          className={styles.ci_home_connect_numbers}
        >
          <div>
            <b style={{ fontFamily: "DM Sans", fontSize: "20px" }}>1,00,000</b>
            <span className={styles.ci_home_connect_plus}>+</span>
          </div>
          <div className={styles.ci_home_connect_number_details}>
            Petitions Signed
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={4}
          lg={4}
          xl={4}
          className={`${styles.ci_home_connect_numbers} ${styles.number_col_two}`}
        >
          <div>
            <b style={{ fontFamily: "DM Sans", fontSize: "20px" }}>1,000</b>
            <span className={styles.ci_home_connect_plus}>+</span>
          </div>
          <div className={styles.ci_home_connect_number_details}>
            Petitions Signed
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={4}
          lg={4}
          xl={4}
          className={styles.ci_home_connect_numbersnew}
          // style={{paddingLeft:'10px'}}
        >
          <div>
            <b style={{ fontFamily: "DM Sans", fontSize: "20px" }}>1,000</b>
            <span className={styles.ci_home_connect_plus}>+</span>
          </div>
          <div className={styles.ci_home_connect_number_details}>
            Petitions Signed
          </div>
        </Col>
      </Row>
      <div className={styles.ci_home_connect_photo_writeup_container}>
        <div
          style={{
            backgroundImage: `url('/submit-photo-bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={styles.ci_home_connect_photo_writeup_left_card}
        >
          <div
            className={styles.ci_home_connect_photo_writeup_left_card_camera}
          >
            <Image
              alt="alt"
              // placeholder="blur"
              {...CameraIcon}
              className={styles.icon_wrapeer}
            />
          </div>
          <div
            className={styles.ci_home_connect_photo_writeup_left_card_heading}
          >
            Submit a Photo
          </div>
          <div
            className={
              styles.ci_home_connect_photo_writeup_left_card_subheading
            }
          >
            CI is an entirely volunteer-driven, non-profit, non-sponsored portal
            that aim..
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url('/submit-writeup-bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={styles.ci_home_connect_photo_writeup_right_card}
        >
          <div
            className={styles.ci_home_connect_photo_writeup_right_card_camera}
          >
            <Image
              alt="alt"
              // placeholder="blur"
              {...EditIcon}
              className={styles.icon_wrapeer}
            />
          </div>
          <div
            className={styles.ci_home_connect_photo_writeup_right_card_heading}
          >
            Submit a Writeup
          </div>
          <div
            className={
              styles.ci_home_connect_photo_writeup_right_card_subheading
            }
          >
            CI is an entirely volunteer-driven, non-profit, non-sponsored portal
            that aim..
          </div>
        </div>
      </div>
    </div>
  );
}

export default CiHomeConnect;
