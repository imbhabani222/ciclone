import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Row, Typography } from "antd";
import styles from "./index.module.css";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import Image from "next/image";
import Loader from "../Loader";

function CiHomeExternalLinks(props) {
  const router = useRouter();
  const params = useRouter();
  const [load, setLoad] = useState(false);
  const [toNumber, setToNumber] = useState(9);
  const [fromNumber, setFromNumber] = useState(0);
  // const showNext9 = () => {
  //   if (toNumber >= props?.data?.length) {
  //     return;
  //   } else {
  //     setFromNumber(toNumber);
  //     setToNumber(toNumber + 9);
  //   }
  // };

  const showNext9 = () => {
    if (toNumber + 9 <= props?.data?.length) {
      setFromNumber(toNumber);
      setToNumber(toNumber + 9);
    }
  };

  const showPrev9 = () => {
    if (fromNumber - 9 >= 0) {
      setToNumber(fromNumber);
      setFromNumber(fromNumber - 9);
    }
  };

  const handleClick = () => {
    // setTimeout(() => {
    //   setLoad(false);
    //   router.push("/external-link");
    // }, 2000);
    // setLoad(true);
    window.open("/external-links", "_blank");
  };

  // const showPrev9 = () => {
  //   if (fromNumber == 0) {
  //     return;
  //   } else {
  //     setFromNumber(toNumber - 12);
  //     setToNumber(toNumber - 4);
  //   }
  // };
  console.log(toNumber, props.data.length, "to---");
  return (
    <div className={styles.ci_home_elinks_container}>
      <div className={styles.ci_home_elinks_heading}>From the web</div>
      <div className={styles.ci_home_elinks_heading_bottom_border}></div>
      <Row
        gutter={[32, 32]}
        // justify="space-between"
        // className={styles.ci_home_featured_card_container}
      >
        {props?.data?.slice(fromNumber, toNumber).map((item, index) => {
          const filterLinks = item?.postData?.filter(
            (ele) => ele.meta_key == "external_url"
          );
          // console.log(filterLinks[0].meta_value, "filterLinks");
          return (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={11}
              lg={8}
              xl={8}
              onClick={() => window.open(filterLinks[0].meta_value)}
            >
              <div className={styles.ci_home_featured_cards}>
                <div className={styles.ci_home_featured_cards_sideline}></div>
                <div className={styles.ci_home_featured_card_text}>
                  {item?.post_title}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
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
            onClick={() => showPrev9()}
            draggable="false"
            className={styles.arrow_btns}
          />

          <Image
            alt="alt"
            // placeholder="blur"
            style={
              toNumber > 18 ? { cursor: "not-allowed" } : { cursor: "pointer" }
            }
            {...RightArrow}
            onClick={() => {
              if (toNumber > 18) {
                // Code to disable the action
              } else {
                showNext9();
              }
            }}
            className={`${styles.arrow_btns} ${styles.arrow_right}`}
          />
        </div>
        <button
          className={styles.ci_home_slider_viewmore}
          onClick={() => params.push("/external-links")}
        >
          View More{" "}
          <Image
            alt="alt"
            // placeholder="blur"
            {...RedRightArrow}
            className={styles.arrow_red_icon}
          />
          {load && (
            <>
              <Loader />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CiHomeExternalLinks;
