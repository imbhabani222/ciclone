import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Col, Pagination, Row, Spin } from "antd";
import Image from "next/image";
import styles from "./externalLinks.module.css";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import Img2 from "../../public/assets/images/homeImgs/elink-sub.svg";
import Loader from "../../components/Loader";

function ExternalLinkList() {
  const params = useRouter();

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...LeftArrow} alt="Privious" />
        </a>
      );
    }

    if (type === "next") {
      return (
        <a>
          <Image {...RightArrow} alt="Next" />
        </a>
      );
    }

    return originalElement;
  };

  const [visible, setVisible] = useState(true);
  const [linkData, setLinkData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [number, setNumber] = useState(1);

  const postsPerPage = 12;
  const externalLinkApiCall = () => {
    setLinkLoading(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=external-links&limit=30`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setLinkData(res?.data?.data);
        setLinkLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLinkLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };
  const latestArticleApiCall = () => {
    setLoading(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/search?post_type=articles&tags=articles&limit=4`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setArticleData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };
  const handlePage = (pageNumber) => {
    setNumber(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  let newData = linkData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  useEffect(() => {
    externalLinkApiCall();
    latestArticleApiCall();
    setVisible(true);
  }, []);

  // console.log("useEffect++++++++++++", loading);

  if (loading || linkLoading) {
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
    <div className={styles.container}>
      <div className={styles.ci_home_elinks_heading}>Links</div>
      <div className={styles.ci_home_elinks_heading_bottom_border}></div>
      <Row
        justify="space-between"
        className={styles.ci_home_featured_card_container}
      >
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Row
            justify="space-between"
            style={{ display: "flex", rowGap: "30px", columnGap: "10px" }}
          >
            {newData?.map((elem, index) => {
              const filterLinks = elem?.postData?.filter(
                (ele) => ele.meta_key == "external_url"
              );
              // console.log(filterLinks[0].meta_value, "filterLinks");
              return (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={11}
                  xl={11}
                  onClick={() => params.push(filterLinks[0].meta_value)}
                  //   onClick={() => clickedLink()}
                  className={styles.ci_home_featured_cards}
                >
                  <div className={styles.ci_home_featured_cards_sideline}></div>
                  <div className={styles.ci_home_featured_card_text}>
                    {elem?.post_title}
                  </div>
                </Col>
              );
            })}
          </Row>
          <div style={{ marginTop: "20px" }}>
            <Pagination
              itemRender={itemRender}
              className={styles.pagination}
              defaultCurrent={1}
              pageSize={postsPerPage}
              total={linkData?.length}
              onChange={handlePage}
              showTitle={false}
              onShowSizeChange={false}
            />
            {/* <Pagination defaultCurrent={1} total={50} /> */}
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={7}
          className={styles.ci_home_articles_right_content}
        >
          <div className={styles.related_topics}>Latest Articles</div>
          {articleData?.slice(1, 4)?.map((item, index) => {
            const filterImg = item?.postData?.filter(
              (ele) => ele.meta_key == "post_image"
            );
            // console.log(filterImg, "filterImgforarticle");
            // const articleImage = item?.images[0];
            // console.log(articleImage);
            return (
              <div
                key={index}
                className={styles.related_topic_card}
                onClick={() => params.push(`/articles-details/${item.post_id}`)}
              >
                <div style={{ width: "50%", display: "flex" }}>
                  <Image
                    src={`https://www.conservationindia.org/wp-content/files_mf/${
                      filterImg?.at(-1)?.meta_value
                    }`}
                    alt="alt"
                    width={100}
                    height={100}
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.related_topic_card_img}
                  />
                  {/* <Image
                    alt="alt"
                    {...Img2}
                    className={styles.related_topic_card_img}
                  /> */}
                </div>
                <div className={styles.related_topic_card_details}>
                  <div className={styles.related_topic_card_details_heading}>
                    {item?.post_title}
                    {/* A Leopard’s Meal – the Ubiquitous Feral Dog */}
                  </div>
                  <div
                    className={styles.related_topic_card_details_subheading}
                    dangerouslySetInnerHTML={{ __html: item?.post_content }}
                  />
                  {/* <div className={styles.related_topic_card_details_subheading}>
                    {item?.post_content} */}

                  {/* Man’s so-called best friend is indeed the most numerous .... */}
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default ExternalLinkList;
