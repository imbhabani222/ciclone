import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
// import { sanitize } from "dompurify";
import Slider from "react-slick";
import styles from "./index.module.css";
import { Button, Modal, Col, Row } from "antd";
import RedRightArrow from "../../public/assets/images/Red-Arrow.svg";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import NoImg from "../../public/no-img.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import getWindowDimensions from "../Constants/getWidth";

export default function ReletedComponentSlider(props) {
  const router = useRouter();
  const params = useRouter();

  const sliderRef = useRef(null);
  const [data, setData] = useState([]);
  const [pageName, setPageName] = useState("");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [imgaeModalOpen, setImgaeModalOpen] = useState(false);
  const [modalImgae, setModalImage] = useState();
  const [modaltitle, setModalTitle] = useState("");
  const [sliderClicked, setSliderClicked] = useState(0);

  const [toNumber, setToNumber] = useState(3);
  const [fromNumber, setFromNumber] = useState(0);
  const showNext3 = () => {
    if (toNumber >= props?.article?.length) {
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

  useEffect(() => {
    setData(props.data);
    setPageName(props.pageName);
  }, [props]);

  const previousClick = () => {
    console.log("+++++,", sliderRef);
    sliderRef.current.slickPrev();
  };

  const nextClick = () => {
    setSliderClicked();
    sliderRef.current.slickNext();
  };
  console.log(data);
  return (
    <div className={styles.main_container}>
      <div style={{ marginTop: 30 }}>
        <Slider
          // dots={pageName === "topicimage" ? true : false}

          dots={["hometopics"]?.includes ? false : true}
          infinite={false}
          ref={sliderRef}
          slidesToShow={windowDimensions < 768 ? 1 : 3}
        >
          {data?.map((item, index) => {
            const date = item?.post_date?.split("G")[0];
            var options = { year: "numeric", month: "long", day: "numeric" };
            var today = new Date(date);
            var videoDate = today.toLocaleDateString("en-US", options);
            const filterImgGallery = item?.postData?.filter(
              (ele) => ele.meta_key == "post_photo"
            );
            const filterImgGallery1 = item?.postData?.filter(
              (ele) => ele.meta_key == "photo_story_img"
            );
            const filterVideo = item?.postData?.filter(
              (video) => video.meta_key == "youtube_video_url"
            );
            const filterImg = item?.postData?.filter(
              (img) =>
                img?.meta_key == "post_image" ||
                img?.meta_key == "_wp_attached_file" ||
                img?.meta_key == "post_photo" ||
                img?.meta_key == "photo_story_img"
            );
            let allFilterImg = filterImg?.map((elem) =>
              elem.meta_value ? elem.meta_value : false
            );
            console.log(allFilterImg, "allFilterImg----");

            const filterImg1 = item?.postData?.filter(
              (elem) =>
                elem.meta_key == "topic_image" || elem.meta_key == "post_image"
            );
            const topicsTags = item?.postData?.map((tag) =>
              tag?.meta_key == "topic_tags" ? tag?.meta_value : false
            );
            const topicsTagArray = Object.values(topicsTags);
            const filteredTopics = topicsTagArray.filter(
              (elem) => elem != false
            );

            return (
              <div st key={index} className={styles.card}>
                {pageName === "hometopic" && (
                  <div className={styles.ci_home_topics_container}>
                    <Row
                      gutter={[8]}
                      // justify="space-between"
                      className={styles.ci_home_topics_card_container}
                    >
                      <Col
                        key={index}
                        xs={24}
                        sm={24}
                        md={8}
                        lg={23}
                        xl={23}
                        className={styles.ci_home_topics_antd_col}
                      >
                        <div
                          className={styles.images}
                          key={index}
                          onClick={() =>
                            router.push(
                              `topic-details/${item.post_id}?&tag="${filteredTopics[0]}"`
                            )
                          }
                          // onClick={() => router.push(`topic-details/${item.post_id}`)}
                        >
                          {filterImg1.length > 0 ? (
                            filterImg1?.map((img, index) => {
                              if (index == 0) {
                                return (
                                  <>
                                    <Image
                                      src={
                                        img?.meta_value !== ""
                                          ? `https://www.conservationindia.org/wp-content/files_mf/${img?.meta_value}`
                                          : NoImg
                                      }
                                      alt="alt"
                                      width={500}
                                      height={300}
                                      style={{ height: "500", width: "100%" }}
                                      className={styles.ci_home_topics_card_img}
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
                                width={500}
                                height={300}
                                style={{ height: "500", width: "100%" }}
                                className={styles.ci_home_topics_card_img}
                              />
                            </>
                          )}
                        </div>
                        <div className={styles.ci_home_topics_card_img_details}>
                          <div
                            className={
                              styles.ci_home_topics_card_img_details_heading
                            }
                          >
                            {item?.post_title}
                          </div>
                          <div className={styles.ci_home_topics_card_img_count}>
                            {/* {13} Articles • {2} Images {item} */}
                          </div>
                          <div
                            className={styles.ci_home_topics_card_line}
                          ></div>
                        </div>
                        <div
                          className={
                            styles.ci_home_topics_card_sub_cards_container
                          }
                        ></div>
                      </Col>
                    </Row>
                  </div>
                )}

                {pageName === "articlelist" && (
                  <div className={styles.slider_card}>
                    <Image
                      alt="alt"
                      {...item?.img}
                      className={styles.slider_card_img}
                    />
                    <div className={styles.text_details}>
                      <div className={styles.topic_related_heading}>
                        {item?.title}
                      </div>
                      <div className={styles.topic_related_sub_heading}>
                        {item?.article_count}
                        {item?.img_count}
                      </div>
                    </div>
                  </div>
                )}
                {pageName === "homecampaign" && (
                  <div
                    onClick={() =>
                      params.push(
                        `/campaign-details/${item?.post_id}?${item?.post_title
                          ?.split(" ")
                          .join("-")}`
                      )
                    }
                    className={styles.ci_home_campaigns_card}
                  >
                    <div className={styles.card_img}>
                      {allFilterImg?.length !== 0 &&
                      allFilterImg[0] !== false &&
                      allFilterImg[0] !== true ? (
                        <Image
                          src={`https://www.conservationindia.org/wp-content/files_mf/${
                            allFilterImg[0]?.split(".")?.at(-1) === "jpg"
                              ? allFilterImg[0]
                              : allFilterImg[1]
                          }`}
                          // src={NoImg}
                          alt="alt"
                          width={384}
                          height={256}
                          objectFit="cover"
                          objectPosition="center"
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      ) : (
                        <Image
                          src={NoImg}
                          alt="alt"
                          width={384}
                          height={256}
                          objectFit="cover"
                          objectPosition="center"
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      )}
                    </div>

                    <div className={styles.ci_home_campaigns_card_heading}>
                      {item?.post_title}
                    </div>

                    <div
                      className={styles.ci_home_campaigns_card_subheading}
                      // dangerouslySetInnerHTML={{
                      //   __html: htmlDecode(item?.post_data),
                      // }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item?.post_data),
                      }}
                      // dangerouslySetInnerHTML={{
                      //   __html: sanitize(item?.post_data),
                      // }}
                      // dangerouslySetInnerHTML={{ __html: item?.post_data }}
                    ></div>
                    <div className={styles.ci_home_campaigns_card_btn_wrapper}>
                      {item?.tags
                        ?.filter(
                          (tag) =>
                            tag?.name !== "conservation campaigns" &&
                            tag?.name !== "featured article" &&
                            tag?.name !== "Campaigns"
                          // tag?.name.split(" ").length === 2
                        )
                        // ?.filter((abc) => abc?.name?.split(" ")?.length === 1)
                        ?.slice(0, 2)
                        ?.map((tag, index) => {
                          return (
                            <Button
                              key={index}
                              onClick={(e) => e.stopPropagation()}
                              className={styles.tag_button}
                            >
                              {tag?.name?.split(" ")?.slice(0, 3)?.join(" ")}
                            </Button>
                          );
                        })}

                      {/* {item?.tags?.slice(0, 2)?.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            onClick={(e) => e.stopPropagation()}
                            className={styles.tag_button}
                          >
                            {item?.name}
                          </Button>
                        );
                      })} */}
                    </div>
                  </div>
                )}
                {pageName === "topicimage" && (
                  <div
                    style={index === 0 ? { border: "0px" } : {}}
                    onClick={() => {
                      setImgaeModalOpen(true);
                      setModalImage(
                        allFilterImg[0] ? allFilterImg[0] : allFilterImg[1]
                      );
                    }}
                    className={styles.ci_topic_image_card}
                  >
                    {/* <div className={styles.ci_topic_img_view_btn}>
                      {index + 1}
                    </div> */}
                    <div>
                      {allFilterImg?.length !== 0 &&
                      allFilterImg[0] !== false &&
                      allFilterImg[0] !== true ? (
                        <Image
                          src={`https://www.conservationindia.org/wp-content/files_mf/${
                            allFilterImg[0] ? allFilterImg[0] : allFilterImg[1]
                          }`}
                          alt="alt"
                          width={384}
                          height={256}
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      ) : (
                        <Image
                          src={NoImg}
                          alt="alt"
                          width={384}
                          height={256}
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
                {pageName == "gallerydetail" && (
                  <div
                    onClick={() =>
                      params.push(
                        `/gallery-details/${item.post_id}?${item?.post_title
                          ?.split(" ")
                          .join("-")}`
                      )
                    }
                    className={styles.gallery_details_carousel_card}
                  >
                    <Image
                      src={
                        filterImgGallery[0] &&
                        filterImgGallery[0]?.meta_value !== ""
                          ? `https://www.conservationindia.org/wp-content/files_mf/${filterImgGallery[0]?.meta_value}`
                          : `https://www.conservationindia.org/wp-content/files_mf/${filterImgGallery1[0]?.meta_value}`
                      }
                      alt="alt"
                      width={384}
                      height={384}
                      className={styles.gallery_details_related_carousel_img}
                    />

                    <div className={styles.gallery_details_related_img_title}>
                      {item?.post_title}
                    </div>
                  </div>
                )}

                {pageName == "videodetail" && (
                  <div
                    onClick={() =>
                      params.push(
                        `/video-details/${item?.post_id}?${item?.post_title
                          ?.split(" ")
                          .join("-")}`
                      )
                    }
                    className={styles.video_details_carousel_card}
                  >
                    <iframe
                      className={styles.video_details_iframe}
                      src={`https://www.youtube.com/embed/${filterVideo[0]?.meta_value}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    <div className={styles.video_details_related_img_wrapper}>
                      <div className={styles.video_details_related_img_heading}>
                        {/* {item.sub_heading} */}
                        {videoDate} • 8 min read
                      </div>
                      <div className={styles.video_details_related_img_title}>
                        {/* {item.title} */}
                        {item?.post_title}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
      {/* {data?.length > 3 && */}
      <div className={styles.ci_home_slider_container}>
        {data?.length > 3 ? (
          <div className={styles.hide_arrow_btns}>
            <Image
              // placeholder="blur"
              alt="alt"
              {...LeftArrow}
              onClick={() => previousClick()}
              className={styles.arrow_btns}
            />
            <Image
              // placeholder="blur"
              alt="alt"
              {...RightArrow}
              onClick={() => nextClick()}
              className={`${styles.arrow_btns} ${styles.arrow_right}`}
            />
          </div>
        ) : null}

        {pageName !== "topicimage" && (
          <button
            onClick={() =>
              router.push(
                `${
                  pageName === "homecampaign"
                    ? "/campaign"
                    : pageName === "gallerydetail"
                    ? "/gallery"
                    : pageName === "hometopic"
                    ? "/topics"
                    : pageName === "videodetail"
                    ? "/gallery"
                    : ""
                }`
              )
            }
            className={styles.ci_home_slider_viewmore}
          >
            View More{" "}
            <Image
              // placeholder="blur"
              alt="alt"
              {...RedRightArrow}
              className={styles.arrow_red_icon}
            />
          </button>
        )}
      </div>
      {/* } */}

      <Modal
        title={modaltitle}
        centered
        visible={imgaeModalOpen}
        onOk={() => setImgaeModalOpen(false)}
        onCancel={() => setImgaeModalOpen(false)}
        footer={false}
      >
        <Image
          src={`https://www.conservationindia.org/wp-content/files_mf/${modalImgae}`}
          alt="modal_img"
          width={500}
          height={500}
          objectFit="cover"
          objectPosition="center"
        />
      </Modal>
    </div>
  );
}
