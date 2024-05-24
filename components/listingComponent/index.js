import { Col, Pagination, Row, Button } from "antd";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Logo from "../../public/assets/images/logo.svg";
import { useRouter } from "next/router";
import NoImg from "../../public/no-img.png";

function ListingComponent(props) {
  // console.log("data from gallery +++++++++++++++", props);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [listingPageName, setListingPageName] = useState("event");
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    setData(props.data); //all data set here
    setListingPageName(props.pageName); // PageName set here
    setPageTitle(props.pageTitle); //PageTitle set here
  }, [props, props.data]);
  return (
    <div className={styles.main_container}>
      {pageTitle && (
        <>
          <div className={styles.page_title}>{pageTitle}</div>
          <div className={styles.page_title_under_line}></div>
        </>
      )}
      <Row
        gutter={[32, 16]}
        justify="space-between"
        className={styles.card_row}
      >
        {/* {console.log(data, "data")} */}
        {data
          // ?.filter(
          //   (item1) => item1?.post_data !== "" || item1?.tags?.length !== 0
          // )
          ?.map((item, index) => {
            const readTime = Math.round(
              item?.post_data?.split(" ").length / 60
            );
            // console.log(readTime);
            const date = item?.post_date?.split("G")[0];
            var options = { year: "numeric", month: "long", day: "numeric" };
            var today = new Date(date);
            var videoDate = today.toLocaleDateString("en-US", options);
            // console.log(imgClickedBy, "imgClickedBy----");

            const imgCredits = item?.postData?.filter(
              (elem) =>
                elem?.meta_key == "img_credits" || elem?.meta_key == "post-auth"
            );

            //   if (
            //     elem?.meta_key === "img_credits" &&
            //     elem?.meta_value !== ""
            //   ) {
            //     return elem;
            //   } else if (elem.meta_key == "post-auth") {
            //     return elem;
            //   }
            // });
            const imgClickedBy = imgCredits?.map((click) =>
              click?.meta_value ? click?.meta_value : false
            );
            const filterImg = item?.postData?.filter(
              (img) =>
                img?.meta_key == "post_image" ||
                img?.meta_key == "_wp_attached_file" ||
                img?.meta_key == "post_photo" ||
                img?.meta_key == "photo_story_img"
            );
            const filterVideo = item?.postData?.filter(
              (video) => video.meta_key == "youtube_video_url"
            );
            // const vimeoPlyaerUrl = item?.postData?.filter((item,index)=>{
            //   if()
            // })
            const allFilterImg = filterImg?.map((elem) =>
              elem.meta_value ? elem.meta_value : false
            );

            const validation = allFilterImg.every(
              (val) => val != null || val != false
            );

            console.log("++++++++", allFilterImg);
            const displayImage = (allFilterImg) => (
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
                    width={250}
                    height={250}
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.ci_home_articles_left_content_card_img}
                  />
                ) : (
                  <Image
                    src={NoImg}
                    alt="alt"
                    width={250}
                    height={250}
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.ci_home_articles_left_content_card_img}
                  />
                )}
              </div>
            );

            // {
            //   allFilterImg?.map((item, index) => {
            //     if (index == 0) {
            //       return (
            //         <>
            //           <Image
            //             src={`https://www.conservationindia.org/wp-content/files_mf/${item.meta_value}`}
            //             alt="alt"
            //             width={250}
            //             height={230}
            //             className={styles.top_container_img}
            //           />
            //         </>
            //       );
            //     }
            //   });
            // }
            return listingPageName !== "featured" &&
              item?.post_status === "publish" ? (
              <Col
                key={index}
                className={styles.listing_card}
                xs={24}
                sm={24}
                md={11}
                lg={listingPageName == "campaign-details" ? 24 : 8}
                xl={listingPageName == "campaign-details" ? 24 : 8}
                onClick={() =>
                  router.push(
                    `${
                      listingPageName == "event"
                        ? "/event-details"
                        : listingPageName == "gallery"
                        ? `/gallery-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "featured"
                        ? `/featured-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "video"
                        ? `/video-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "landscape"
                        ? "/landscape-details"
                        : listingPageName == "campaign"
                        ? `/campaign-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : ""
                    }`
                  )
                }
              >
                <div
                  className={styles.card_img}
                  style={{ display: "flex", columnGap: "10px" }}
                >
                  {listingPageName == "gallery" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName == "featured" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName == "campaign" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName === "video" ? (
                    <div className={styles.video_details_iframe_wrapper}>
                      <iframe
                        style={{ width: "100%" }}
                        className={styles.video_details_iframe}
                        src={`https://www.youtube.com/embed/${filterVideo[0].meta_value}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {props.title && (
                  <h3 className={styles.card_title}>
                    <div className={styles.red_line}></div>
                    {item.post_title}
                  </h3>
                )}
                {listingPageName == "event" && (
                  <div style={{ cursor: "pointer" }}>
                    <h4 className={styles.event_time}>{item.time}</h4>
                    <h2 className={styles.event_price}>
                      {item.price}
                      <span className={styles.including_gst}>
                        (including GST)
                      </span>
                    </h2>
                  </div>
                )}

                {listingPageName === "campaign" && (
                  <div style={{ cursor: "pointer" }}>
                    <div
                      className={styles.sub_heading}
                      dangerouslySetInnerHTML={{ __html: item?.post_data }}
                    ></div>
                    {/* <div className={styles.tag_button_container}>
                      {item?.tags?.slice(0, 2)?.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/tags/${item?.slug}`);
                            }}
                            className={styles.tag_button}
                          >
                            {item.name?.slice(0, 15)}
                          </Button>
                        );
                      })}
                      <Button key={index} className={styles.tag_button}>
                        {item?.tags.length > 2 ? (
                          <>+{item?.tags.length - 2} more</>
                        ) : (
                          ""
                        )}
                      </Button>
                    </div> */}
                  </div>
                )}
                {listingPageName === "campaign-details" && (
                  <div style={{ cursor: "pointer" }}>
                    <div className={styles.campaign_details_listing_details}>
                      <div className={styles.campaign_details_heading}>
                        {item.post_title}
                      </div>
                    </div>
                  </div>
                )}
                {listingPageName === "gallery" && (
                  <div className={styles.gallery_listing_details}>
                    <div className={styles.gallery_heading}>
                      {item.post_title}
                    </div>
                    <div className={styles.gallery_sub_heading}>
                      Photographer -
                      <span className={styles.photograper_name}>
                        {imgClickedBy[0] ? imgClickedBy[0] : imgClickedBy[1]}
                      </span>
                    </div>
                  </div>
                )}
                {listingPageName === "featured" && (
                  <div className={styles.gallery_listing_details}>
                    <div className={styles.gallery_heading}>
                      {item.post_title}
                    </div>
                    <div className={styles.gallery_sub_heading}>
                      Photographer -
                      <span className={styles.photograper_name}>
                        {imgClickedBy[0] ? imgClickedBy[0] : imgClickedBy[1]}
                      </span>
                    </div>
                  </div>
                )}
                {listingPageName === "video" && (
                  <div className={styles.video_details_container}>
                    <div className={styles.video_sub_heading}>{videoDate}</div>
                    <div className={styles.video_heading}>
                      {item.post_title}
                    </div>
                  </div>
                )}
              </Col>
            ) : (
              <Col
                key={index}
                className={styles.listing_card}
                xs={24}
                sm={24}
                md={11}
                lg={listingPageName == "campaign-details" ? 24 : 8}
                xl={listingPageName == "campaign-details" ? 24 : 8}
                onClick={() =>
                  router.push(
                    `${
                      listingPageName == "event"
                        ? "/event-details"
                        : listingPageName == "gallery"
                        ? `/gallery-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "featured"
                        ? `/featured-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "video"
                        ? `/video-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : listingPageName == "landscape"
                        ? "/landscape-details"
                        : listingPageName == "campaign"
                        ? `/campaign-details/${item.post_id}?${item?.post_title
                            ?.split(" ")
                            .join("-")}`
                        : ""
                    }`
                  )
                }
              >
                <div
                  className={styles.card_img}
                  style={{ display: "flex", columnGap: "10px" }}
                >
                  {listingPageName == "gallery" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName == "featured" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName == "campaign" ? (
                    validation && displayImage(allFilterImg)
                  ) : listingPageName === "video" ? (
                    <div className={styles.video_details_iframe_wrapper}>
                      <iframe
                        className={styles.video_details_iframe}
                        src={`https://www.youtube.com/embed/${filterVideo[0].meta_value}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {props.title && (
                  <h3 className={styles.card_title}>{item.post_title}</h3>
                )}
                {listingPageName == "event" && (
                  <div style={{ cursor: "pointer" }}>
                    <h4 className={styles.event_time}>{item.time}</h4>
                    <h2 className={styles.event_price}>
                      {item.price}
                      <span className={styles.including_gst}>
                        (including GST)
                      </span>
                    </h2>
                  </div>
                )}
                {listingPageName === "campaign" && (
                  <div style={{ cursor: "pointer" }}>
                    <div
                      className={styles.sub_heading}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item?.post_data),
                      }}
                      // dangerouslySetInnerHTML={{ __html: item?.post_data }}
                    ></div>
                    <div className={styles.tag_button_container}>
                      {item?.tags?.slice(0, 2)?.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/tags/${item?.slug}`);
                            }}
                            className={styles.tag_button}
                          >
                            {item.name}
                          </Button>
                        );
                      })}
                      <Button key={index} className={styles.tag_button}>
                        {item?.tags.length > 2 ? (
                          <>+{item?.tags.length - 2}more</>
                        ) : (
                          ""
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                {listingPageName === "campaign-details" && (
                  <div style={{ cursor: "pointer" }}>
                    <div className={styles.campaign_details_listing_details}>
                      <div className={styles.campaign_details_heading}>
                        {item.post_title}
                      </div>
                    </div>
                  </div>
                )}
                {listingPageName === "gallery" && (
                  <div className={styles.gallery_listing_details}>
                    <div className={styles.gallery_heading}>
                      {item.post_title}
                    </div>
                    <div className={styles.gallery_sub_heading}>
                      Photographer -
                      <span className={styles.photograper_name}>
                        {imgClickedBy}
                      </span>
                    </div>
                  </div>
                )}
                {listingPageName === "featured" && (
                  <div className={styles.gallery_listing_details}>
                    <div className={styles.gallery_heading}>
                      {item.post_title}
                    </div>
                    <div className={styles.gallery_sub_heading}>
                      Photographer -
                      <span className={styles.photograper_name}>
                        {imgClickedBy}
                      </span>
                    </div>
                  </div>
                )}
                {listingPageName === "video" && (
                  <div className={styles.video_details_container}>
                    <div className={styles.video_sub_heading}>{videoDate}</div>
                    <div className={styles.video_heading}>
                      {item.post_title}
                    </div>
                  </div>
                )}
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default ListingComponent;
