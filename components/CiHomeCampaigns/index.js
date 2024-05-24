import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Col, Row } from "antd";
import ReletedComponentSlider from "../../components/relatedComponent";
import { useRouter } from "next/router";

function CiHomeCampaigns(props) {
  const router = useRouter();
  // console.log("campaign_______", props?.firstCampaign);
  return (
    <div className={styles.ci_home_campaigns_container}>
      <div className={styles.ci_home_essentials_heading}>Campaigns</div>
      <div className={styles.ci_home_essentials_heading_bottom_border}></div>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={12}
          xl={12}
          className={styles.ci_home_campaign_subheading}
        >
          {/* There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour. */}
        </Col>
      </Row>
      <ReletedComponentSlider
        data={props?.firstCampaign
          ?.filter(
            (tag) =>
              tag?.tags?.name !== "conservation campaigns" &&
              tag?.tags?.name !== "featured article"
            // tag?.name.split(" ").length === 2
          )
          ?.filter((itm) => itm?.tags?.length >= 2)}
        pageName="homecampaign"
      />
    </div>
  );
}

export default CiHomeCampaigns;
