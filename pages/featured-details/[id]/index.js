import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import GalleryImg from "../../../public/assets/images/galleryDetails/gallery-img.svg";
import Img2 from "../../../public/assets/images/galleryDetails/img-2.svg";
import Img3 from "../../../public/assets/images/galleryDetails/img-3.svg";
import PictureAward from "../../../public/assets/images/galleryDetails/picture-award.svg";
import RightArrow from "../../../public/assets/images/right-arrow@2x.svg";
import UserImg from "../../../public/assets/images/galleryDetails/user-img.svg";
import RelatedImg from "../../../public/assets/images/galleryDetails/related-img.png";
import LeftMove from "../../../public/assets/images/galleryDetails/left-move.svg";
import RightMove from "../../../public/assets/images/galleryDetails/right-move.svg";
import { Button, Col, Input, Row, Select, Spin } from "antd";
import { motion } from "framer-motion";
import styles from "../featuredDetails.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import FaceBookImg from "../../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedInImg from "../../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import TwitterImg from "../../../public/assets/images/socialIcons/twitter@2x.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReletedComponentSlider from "../../../components/relatedComponent";
import ErrorPage from "../../404";
import Loader from "../../../components/Loader";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const res = await fetch(
    ` http://localhost:3000/api/getPosts?post_type=gallery&post_id=${id}`
  );
  const data = await res.json();

  const related = await fetch(
    " http://localhost:3000/api/search?post_type=gallery&tags=photo-feature"
  );
  const relatedData = await related.json();
  return { props: { data, relatedData } };
}

function FeaturedDetails(props) {
  const params = useRouter();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const imageDetails1 = useSelector((state) => state?.data?.imageDetails || []);
  const [imageDetails, setImageDetails] = useState([]);
  useEffect(() => {
    setImageDetails(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);
  console.log("propss---.", props);
  // console.log(imageDetails?.result?.data);
  const [nodata, setNodata] = useState(null);
  const [featuredData, setFeaturedData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const relatedFeaturedApiCall = (id) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=gallery&post_id=${id}`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setFeaturedData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const relatedapi = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        " https://ci-demo.hutechweb.com/api/search?post_type=gallery&tags=photo-feature"
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setRelatedData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  useEffect(() => {
    setVisible();
    relatedFeaturedApiCall(id);
    relatedapi();
    setVisible(true);
    // dispatch({ type: "FETCH_IMAGE_DETAILS", post_id: params.query.id });
  }, []);

  const [tags, setTags] = useState([
    "NBWL Matters",
    "Endangered Species",
    "Feral Dogs - Wildlife Conflicts",
    "Invasive Species",
    "Wildlife Tourism",
  ]);
  const [comments, setComments] = useState([]);
  // const [relatedImgData, setRelatedImgData] = useState([
  //   {
  //     img: RelatedImg,
  //     title: "A giant squirrel dead next to road near Tamilnadu",
  //   },
  //   { img: Img2, title: "A giant squirrel dead next to road near Tamilnadu" },
  //   { img: Img3, title: "A giant squirrel dead next to road near Tamilnadu" },
  //   {
  //     img: RelatedImg,
  //     title: "A giant squirrel dead next to road near Tamilnadu",
  //   },
  //   {
  //     img: RelatedImg,
  //     title: "A giant squirrel dead next to road near Tamilnadu",
  //   },
  //   { img: Img3, title: "A giant squirrel dead next to road near Tamilnadu" },
  // ]);

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = featuredData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );

  let newDatanew = relatedData?.slice(
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

  if (nodata === "NO RECORDS MATCHED SEARCH") {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className={styles.gallery_details_wrapper}>
      {Array.isArray(newData) &&
        newData?.map((elem, index) => {
          const date = elem?.post_date?.split("G")[0];
          var options = { year: "numeric", month: "long", day: "numeric" };
          var today = new Date(date);
          var imageDate = today.toLocaleDateString("en-US", options);
          const filterImg = elem?.postData?.filter(
            (img) =>
              img?.meta_key == "photo_story_img" ||
              img?.meta_key == "_wp_attached_file" ||
              img?.meta_key == "post_image"
            // img?.meta_key == "post_photo"
          );
          const imgCredits = elem?.postData?.filter(
            (elem) =>
              elem?.meta_key == "img_credits" || elem.meta_key == "post-auth"
          );
          const imgClickedBy = imgCredits?.map((click) =>
            click?.meta_value ? click?.meta_value : ""
          );
          const authorBio = elem?.postData?.filter(
            (elem) => elem?.meta_key == "post-auth-bio"
          );
          const oldDescription = elem?.author?.description;
          const filterDescription = authorBio?.map((bio) =>
            bio?.meta_value ? bio?.meta_value : oldDescription
          );
          return (
            <>
              <div key={index}>
                <div className={styles.gallery_details_top_section}>
                  <div className={styles.gallery_details_top_section_inner_div}>
                    <div className={styles.heading}>{elem.post_title}</div>
                    <div className={styles.border_bottom} color="white"></div>
                    <div className={styles.name_publish_date}>
                      {imgClickedBy[0] ? imgClickedBy[0] : imgClickedBy[1]}
                      <div className={styles.name}></div>
                      <div className={styles.publisg_date}>{imageDate}</div>
                    </div>
                    <div className={styles.img_div1}>
                      {/* <Carousel renderThumbs={renderCustomThumbs} showThumbs={true}>
              {[1, 2, 3].map((item, index) => {
                return (
                  <div key={index}>  */}
                      {filterImg?.map((elem, index) => {
                        if (index == 0) {
                          return (
                            <>
                              <Image
                                src={`https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`}
                                alt="alt"
                                width={800}
                                height={500}
                                className={styles.top_container_img}
                              />
                            </>
                          );
                        }
                      })}
                      {/* <div className={styles.img_title}>Picture of the week</div>
                  </div> */}
                      {/* ); 
              })}
            </Carousel> */}

                      {/* <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                src={LeftMove}
                style={{
                  height: "20px",
                  width: "20px",
                  position: "absolute",
                  left: "-10%",
                  top: "50%",
                }}
              />
              <img src={GalleryImg} />
              <img
                src={RightMove}
                style={{
                  height: "20px",
                  width: "20px",
                  position: "absolute",
                  right: "-10%",
                  top: "50%",
                }}
              />
            </div>
            <div className={styles.img_title}>
              <img src={PictureAward} />
              Picture of the week
            </div> */}
                    </div>
                  </div>
                </div>
                <Row
                  gutter={[32, 32]}
                  justify="space-between"
                  className={styles.second_container_row}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={4}
                    lg={4}
                    xl={4}
                    className={styles.second_container_third_col}
                  >
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...FaceBookImg} alt="FaceBookImg" />
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/cws/share?url=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...LinkedInImg} alt="LinkedInImg" />
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?text=${window.location.href}/#`,
                          "_blank",
                          "location=yes,height=800,width=800,scrollbars=yes,status=yes"
                        )
                      }
                    >
                      <Image {...TwitterImg} alt="TwitterImg" />
                    </a>
                  </Col>
                  <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                    <div className={styles.gallery_details_content}>
                      {/* <div className={styles.gallery_details_content_top_card}>
                        <h4>Chosen as “Picture of the week”</h4>
                        <div
                          className={
                            styles.gallery_details_content_details_text
                          }
                          dangerouslySetInnerHTML={{
                            __html: elem?.post_content,
                          }}
                        />
                      </div> */}
                    </div>
                    <div
                      className={styles.gallery_details_content_details_text}
                      dangerouslySetInnerHTML={{ __html: elem?.post_data }}
                    />

                    <div
                      className={
                        styles.gallery_details_content_details_update_text
                      }
                    >
                      Update: The culprits have got anticipatory bail and are
                      not in
                    </div>
                    <div
                      className={styles.gallery_details_content_details_tags}
                    >
                      {elem?.tags.map((item, index) => {
                        return (
                          <Button
                            onClick={() => params.push(`/tags/${item?.slug}`)}
                            key={index}
                            style={{ textTransform: "capitalize" }}
                          >
                            {item?.name}
                          </Button>
                        );
                      })}
                    </div>

                    {comments?.length !== 0 && (
                      <>
                        <div
                          className={
                            styles.gallery_details_content_details_comment
                          }
                        >
                          <div className={styles.heading}>Comments</div>
                          <div className={styles.comments_sortby}>
                            <div> {elem.comments.length} comments</div>
                            {/* <div className="main-wrapper">
                              <div className="sort-wrap">
                                <span
                                  style={{
                                    color: "rgb(108 108 113 / 67%)",
                                    verticalAlign: "sub",
                                  }}
                                >
                                  Sortby:
                                </span>
                              </div>
                              <div className="select-wrapper">
                                <Select
                                  placeholder="Oldest"
                                  style={{ width: "90px" }}
                                  suffixIcon={
                                    <CaretDownOutlined
                                      style={{ color: "#1F1A17" }}
                                    />
                                  }
                                >
                                  <Select.Option value="oldest">
                                    Oldest
                                  </Select.Option>
                                  <Select.Option value="newest">
                                    Newest
                                  </Select.Option>
                                </Select>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div
                          className={styles.gallery_details_content_comments}
                        >
                          {comments.map((item, index) => {
                            return (
                              <div key={index} className={styles.coment_card}>
                                <div style={{ width: "60px", height: "60px" }}>
                                  <Image {...item.img} alt="alt" />
                                </div>
                                <div style={{ width: "80%" }}>
                                  <h4>{item.name}</h4>
                                  <p>{item.comment}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className={styles.gallery_details_content_comments}
                        >
                          {elem.comments.map((item, index) => {
                            return (
                              <div key={index} className={styles.coment_card}>
                                <div style={{ width: "60px", height: "60px" }}>
                                  <Image
                                    src={item.comment_author_url}
                                    alt="UserImg"
                                    {...UserImg}
                                    height={60}
                                    width={60}
                                    className={styles.top_container_img}
                                  />
                                </div>
                                <div style={{ width: "80%" }}>
                                  <h4>{item.comment_author}</h4>
                                  <p>{item.comment_content}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </Col>
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}></Col>
                </Row>
                <div className={styles.gallery_details_related_imgs}>
                  <div className={styles.heading}>Related Images</div>
                  <ReletedComponentSlider
                    data={newDatanew}
                    pageName="gallerydetail"
                  />
                </div>
              </div>
            </>
          );
        })}
      {nodata !== "NO RECORDS MATCHED SEARCH" && <></>}
    </div>
  );
}

export default FeaturedDetails;
