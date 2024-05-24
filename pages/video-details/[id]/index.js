import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  Typography,
  Row,
  Col,
  Divider,
  Input,
  Select,
  Button,
  Spin,
} from "antd";
import styles from "../videodetails.module.css";
import Img2 from "../../../public/assets/images/galleryDetails/img-2.svg";
import Img3 from "../../../public/assets/images/galleryDetails/img-3.svg";
import RelatedImg from "../../../public/assets/images/galleryDetails/related-img.png";
import UserImg from "../../../public/assets/images/galleryDetails/user-img.svg";
import Facebook from "../../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedIn from "../../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import Twitter from "../../../public/assets/images/socialIcons/twitter@2x.svg";
import ArrowRight from "../../../public/assets/images/homeImgs/arrow-right-red.png";
import { CaretDownOutlined } from "@ant-design/icons";
import ReletedComponentSlider from "../../../components/relatedComponent/index";
import ErrorPage from "../../404";
import Loader from "../../../components/Loader";
import axios from "axios";

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(
//     ` https://ci-demo.hutechweb.com/api/getPosts?post_type=video&post_id=${id}`
//   );
//   const data = await res.json();

//   const related = await fetch(
//     " https://ci-demo.hutechweb.com/api/search?post_type=video&tags=videos"
//   );
//   const relatedData = await related.json();
//   return { props: { data, relatedData } };
// }

const VideoDetails = (props) => {
  console.log("videooooooooooo", props);
  const params = useRouter();
  const dispatch = useDispatch();
  // const videoDetails1 = useSelector((state) => state?.data?.videoDetails || []);
  const router = useRouter();
  const { id } = router.query;
  const [nodata, setNodata] = useState(null);
  const [videoDetails, setVideoDetails] = useState([]);
  useEffect(() => {
    setVideoDetails(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);
  console.log("propss---.", props);
  const [relatedData, setRelatedData] = useState([]);

  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const relatedVideoApiCall = (id) => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=video&post_id=${id}`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setVideoData(res?.data?.data);
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
        " https://ci-demo.hutechweb.com/api/search?post_type=video&tags=videos"
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
    relatedVideoApiCall(id);
    setVisible(true);
    relatedapi();
    // dispatch({ type: "FETCH_VIDEOS_DETAILS", post_id: params.query.id });
  }, []);

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = videoData?.slice(
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
    <div className={styles.video_details_wrapper}>
      {Array.isArray(newData) &&
        newData?.map((elem, index) => {
          // console.log(':":":":", ', elem);
          const date = elem?.post_date?.split("G")[0];
          var options = { year: "numeric", month: "long", day: "numeric" };
          var today = new Date(date);
          const desc = elem?.postData?.filter((item, index) => {
            if (item?.meta_key === "vimeo_video_desc") {
              return item;
            }
          });
          const descAlt = elem?.postData?.filter((item, index) => {
            if (item?.meta_key === "youtube_video_desc") {
              return item;
            }
          });

          const authorShortBio = elem?.author?.user_meta_data?.filter(
            (item, index) => {
              if (item?.meta_key === "author_short_bio") {
                return item;
              }
            }
          );
          var imageDate = today.toLocaleDateString("en-US", options);
          const filterVideo = elem?.postData?.filter(
            (ele) => ele.meta_key == "youtube_video_url"
          );
          // console.log(filterVideo[0].meta_value, "filterImgGallery1++++++++");
          const authorBio = elem?.postData?.filter(
            (elem) => elem?.meta_key == "post-auth-bio"
          );
          const oldDescription = elem?.author?.description;
          const filterDescription = authorBio?.map((bio) =>
            bio?.meta_value ? bio?.meta_value : oldDescription
          );
          const validation = filterDescription.every((val) => val != null);
          const oldAuthor = `${elem?.author?.first_name}  ${elem?.author?.last_name}`;
          const newAuthor = elem?.postData?.filter(
            (elem) => elem?.meta_key == "post-auth"
          );
          const filterAuthor = newAuthor?.map((auth) =>
            auth?.meta_value ? auth?.meta_value : oldAuthor
          );
          const filterImg = elem?.postData?.filter(
            (ele) =>
              ele.meta_key == "post_image" ||
              ele.meta_key == "_wp_attached_file"
          );
          {
            // console.log(elem, "elem_video");
          }
          return (
            <div key={index}>
              <div className={styles.video_details_container}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Typography className={styles.video_details_header}>
                      {elem.post_title}
                      {/* Conservation Conversations E1: Wildlife Recovery in India */}
                    </Typography>
                  </Col>
                </Row>
                <div className={styles.video_details_header_bottom}></div>
                <div>
                  <div className={styles.video_details_author_date}>
                    <Typography className={styles.video_details_author_name}>
                      {filterAuthor}
                      {/* Shekar Dattatri */}
                    </Typography>
                    <Typography className={styles.video_details_date}>
                      {imageDate}
                      {/* Thursday, Feb 17th, 2022 */}
                    </Typography>
                  </div>
                  <iframe
                    className={styles.video_details_iframe}
                    src={`https://www.youtube.com/embed/${filterVideo[0].meta_value}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className={styles.video_details_body}>
                <Row gutter={[32, 32]}>
                  <Col
                    xs={24}
                    sm={24}
                    md={6}
                    lg={6}
                    xl={6}
                    className={styles.video_details_column}
                  >
                    <Row>
                      <Col xs={8} sm={8} md={24} lg={24} xl={24}>
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
                          <Image {...Facebook} alt="FaceBookImg" />
                        </a>
                      </Col>
                      <Col
                        xs={8}
                        sm={8}
                        md={24}
                        lg={24}
                        xl={24}
                        className={styles.video_details_linkedin_icon}
                      >
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
                          <Image {...LinkedIn} alt="LinkedInImg" />
                        </a>
                      </Col>
                      <Col xs={8} sm={8} md={24} lg={24} xl={24}>
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
                          <Image {...Twitter} alt="Twitter" />
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    className={styles.video_details_column1}
                  >
                    {elem?.post_content !== "" ? (
                      <p className={styles.video_details_paragraph}>
                        {elem?.post_content}
                      </p>
                    ) : elem?.post_content !== "" &&
                      desc[0]?.meta_value !== "" ? (
                      <p
                        className={styles.video_details_autor_content}
                        dangerouslySetInnerHTML={{
                          __html: desc[0]?.meta_value,
                        }}
                      ></p>
                    ) : (
                      <p
                        className={styles.video_details_autor_content}
                        dangerouslySetInnerHTML={{
                          __html: descAlt[0]?.meta_value,
                        }}
                      ></p>
                    )}
                    {console.log("222222222222222222", elem)}
                    {validation ? (
                      <div
                        onClick={() =>
                          params.push(
                            `/authorDetails/${
                              elem?.author?.user_id
                            }?${elem?.author?.first_name
                              ?.split(" ")
                              .join("-")}-${elem?.author?.last_name
                              ?.split(" ")
                              .join("-")}`
                          )
                        }
                        className={styles.video_details_author_information}
                      >
                        <Typography
                          className={styles.video_details_author_name_div}
                        >
                          About the author
                        </Typography>
                        <div
                          className={styles.video_details_author_border}
                        ></div>
                        <p className={styles.video_details_author_name_para}>
                          {filterAuthor}
                        </p>
                        <p
                          className={styles.video_details_autor_content}
                          dangerouslySetInnerHTML={{
                            __html: authorShortBio[0]?.meta_value,
                          }}
                        ></p>
                        {/* <p className={styles.video_details_autor_content}>
        {filterDescription} */}
                        {/* Shakar founded and lead Conservation Initiatives, a
        Northeast-India based NGO dedicated to science-based
        conservation of endangered wildlife and their habitats. Divya is
        interested in new and feasible approaches to better improve our
        understanding of animal movement and dispersal. Varun has
        expertise on the Asian elephant and landscape-scale
        conservation, and hails from Northeast India. */}
                        {/* </p> */}
                      </div>
                    ) : (
                      ""
                    )}
                    <Divider style={{ margin: "4rem 0" }} />
                    <div className={styles.video_details_tags}>
                      {elem.tags.map((item, index) => {
                        return (
                          <Button
                            onClick={() => params.push(`/tags/${item.slug}`)}
                            key={index}
                            className={styles.tag_btn}
                          >
                            {item.name}
                          </Button>
                        );
                      })}
                    </div>

                    <div className={styles.video_details_comment_section}>
                      <h3 className={styles.video_details_comment}>Comments</h3>
                      <div className={styles.video_details_sort}>
                        <p className={styles.video_details_comment_paragraph}>
                          {elem.comments.length} comments
                          {/* 2 comments */}
                        </p>
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

                      <div className={styles.video_details_content_comments}>
                        {elem.comments.map((item, index) => {
                          return (
                            <div key={index} className={styles.coment_card}>
                              <div style={{ width: "60px", height: "60px" }}>
                                <Image
                                  src={item.comment_author_url}
                                  alt="alt"
                                  width={60}
                                  height={60}
                                  // className={styles.top_container_img}
                                />
                                {/* <Image {...item.comment_author_url} alt="alt" /> */}
                              </div>
                              <div style={{ width: "80%" }}>
                                <h4>{item.comment_author}</h4>
                                <p
                                  // className={styles.author_detail}
                                  dangerouslySetInnerHTML={{
                                    __html: item.comment_content,
                                  }}
                                ></p>
                                {/* <p>{item.comment_content}</p> */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <Divider style={{ margin: "3.2rem 0" }} />

                      {/* <div className={styles.add_comment}>
                        <div style={{ width: "60px", height: "60px" }}>
                          <Image
                            alt="UserImg"
                            {...UserImg}
                            height={60}
                            width={60}
                          />
                        </div>
                        <div style={{ width: "83%" }}>
                          <Input
                            placeholder="add a comment.."
                            className={styles.Add_comment_input_box}
                          />
                        </div>
                      </div> */}
                    </div>
                  </Col>
                </Row>
                <div className={styles.video_details_related_imgs}>
                  <div className={styles.heading}>Related Videos</div>
                  <ReletedComponentSlider
                    data={newDatanew}
                    pageName="videodetail"
                  />
                </div>
              </div>
            </div>
          );
        })}
      {nodata !== "NO RECORDS MATCHED SEARCH" && <></>}
    </div>
  );
};

export default VideoDetails;

{
  /* <>
<div className={styles.video_details_container}>
<Row>
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Typography className={styles.video_details_header}>
      Conservation Conversations E1: Wildlife Recovery in India
    </Typography>
  </Col>
</Row>
<div className={styles.video_details_header_bottom}></div>
<div>
  <div className={styles.video_details_author_date}>
    <Typography className={styles.video_details_author_name}>
      Shekar Dattatri
    </Typography>
    <Typography className={styles.video_details_date}>
      Thursday, Feb 17th, 2022
    </Typography>
  </div>
  <iframe
    className={styles.video_details_iframe}
    src="https://www.youtube.com/embed/BBA1BMKn3LU"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
</div>
<div className={styles.video_details_body}>
<Row gutter={[32, 32]}>
  <Col
    xs={24}
    sm={24}
    md={6}
    lg={6}
    xl={6}
    className={styles.video_details_column}
  >
    <Row>
      <Col xs={8} sm={8} md={24} lg={24} xl={24}>
        <Image alt="Facebook" {...Facebook} />
      </Col>
      <Col
        xs={8}
        sm={8}
        md={24}
        lg={24}
        xl={24}
        className={styles.video_details_linkedin_icon}
      >
        <Image alt="LinkedIn" {...LinkedIn} />
      </Col>
      <Col xs={8} sm={8} md={24} lg={24} xl={24}>
        <Image alt="Twitter" {...Twitter} />
      </Col>
    </Row>
  </Col>
  <Col
    xs={24}
    sm={24}
    md={12}
    lg={12}
    xl={12}
    className={styles.video_details_column1}
  >
    <p className={styles.video_details_paragraph}>
      In Episode-1 of Conservation Conversations, renowned wildlife
      biologist, Dr. K. Ullas Karanth, of the Wildlife Conservation
      Society, talks about wildlife recovery in India.
    </p>
    <div className={styles.video_details_author_information}>
      <Typography className={styles.video_details_author_name_div}>
        About the author
      </Typography>
      <div className={styles.video_details_author_border}></div>
      <p className={styles.video_details_author_name_para}>
        Shekar Dattatri
      </p>
      <p className={styles.video_details_autor_content}>
        Shakar founded and lead Conservation Initiatives, a
        Northeast-India based NGO dedicated to science-based
        conservation of endangered wildlife and their habitats. Divya is
        interested in new and feasible approaches to better improve our
        understanding of animal movement and dispersal. Varun has
        expertise on the Asian elephant and landscape-scale
        conservation, and hails from Northeast India.
      </p>
    </div>
    <Divider style={{ margin: "4rem 0" }} />
    <div className={styles.video_details_tags}>
      {tags.map((item, index) => {
        return (
          <Button key={index} className={styles.tag_btn}>
            {item}
          </Button>
        );
      })}
    </div>

    <div className={styles.video_details_comment_section}>
      <h3 className={styles.video_details_comment}>Comments</h3>
      <div className={styles.video_details_sort}>
        <p className={styles.video_details_comment_paragraph}>
          2 comments
        </p>
        <div className="main-wrapper">
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
                <CaretDownOutlined style={{ color: "#1F1A17" }} />
              }
            >
              <Select.Option value="oldest">Oldest</Select.Option>
              <Select.Option value="newest">Newest</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      
      <div className={styles.video_details_content_comments}>
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
      <Divider style={{ margin: "3.2rem 0" }} />

      <div className={styles.add_comment}>
        <div style={{ width: "60px", height: "60px" }}>
          <Image alt="UserImg" {...UserImg} height={60} width={60} />
        </div>
        <div style={{ width: "83%" }}>
          <Input
            placeholder="add a comment.."
            className={styles.Add_comment_input_box}
          />
        </div>
      </div>
     
    </div>
  </Col>
</Row>
<div className={styles.video_details_related_imgs}>
  <div className={styles.heading}>Related Images</div>
  <ReletedComponentSlider
    data={relatedImgData}
    pageName="videodetail"
  />
</div>
</div>
</> */
}
