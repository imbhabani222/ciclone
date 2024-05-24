import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Row, Col } from "antd";
import Image from "next/image";
import NoImg from "../../public/no-img.png";
import { useRouter } from "next/router";

function CiHomeSpotLight(props) {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setData(props?.imagesFetchData?.slice(1, 2));
  }, [props]);

  const filterImg = data[0]?.postData?.filter((elem) => {
    if (elem?.meta_key === "_wp_attached_file" && elem?.meta_value !== "") {
      return elem;
    } else if (elem.meta_key == "post_image") {
      return elem;
    }
  });

  return (
    <div className={styles.ci_home_spotlight_container}>
      <div className={styles.ci_home_spotlight_heading_container}>
        <div className={styles.ci_home_spotlight_heading}>Spotlight</div>
        <div className={styles.ci_home_spotlight_heading_bottom_border}></div>
      </div>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={styles.ci_home_spotlight_subheading}
        >
          {/* There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour. */}
        </Col>
      </Row>
      <Row
        justify="space-between"
        className={styles.ci_home_article_card_container}
        onClick={() =>
          router.push(
            `articles-details/${data[0]?.post_id}?${data[0]?.post_title
              ?.split(" ")
              .join("-")}`
          )
        }
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className={styles.image}>
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
                      width={250}
                      height={180}
                      objectFit="cover"
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
                className={styles.ci_home_essentials_left_content_card_img}
              />
            </>
          )}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={styles.ci_home_article_card_containt}
        >
          <div className={styles.ci_home_article_card_containt_type}>
            Article
          </div>
          <div className={styles.ci_home_article_card_containt_heading}>
            {data[0]?.post_title}
          </div>
          <div className={styles.ci_home_article_card_containt_line}></div>
          <div className={styles.ci_home_article_card_containt_author}>
            {data[0]?.author?.first_name}
            <span> </span> {data[0]?.author?.last_name}
          </div>
          <div
            className={styles.ci_home_article_card_containt_summery}
            dangerouslySetInnerHTML={{ __html: data[0]?.post_content }}
          ></div>
          <div className={styles.ci_home_article_card_containt_published}>
            {data[0]?.post_date?.slice(0, 15)}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CiHomeSpotLight;
