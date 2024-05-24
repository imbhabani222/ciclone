import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Col, Row, Divider, Spin } from "antd";
import styles from "../campaignDetails.module.css";
import campaignImg1 from "../../../public/assets/images/campaignDetails/campaindetailshero.svg";
import Facebook from "../../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedIn from "../../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import Twitter from "../../../public/assets/images/socialIcons/twitter@2x.svg";
import img1 from "../../../public/assets/images/campaignDetails/gallery1/image1.svg";
import img2 from "../../../public/assets/images/campaignDetails/gallery1/image2.svg";
import img3 from "../../../public/assets/images/campaignDetails/gallery1/image3.svg";
import img4 from "../../../public/assets/images/campaignDetails/gallery1/image4.svg";
import img5 from "../../../public/assets/images/campaignDetails/gallery1/image5.svg";
import img6 from "../../../public/assets/images/campaignDetails/gallery1/image6.svg";
import img7 from "../../../public/assets/images/campaignDetails/gallery1/image7.svg";
import img8 from "../../../public/assets/images/campaignDetails/gallery1/image8.svg";
import img9 from "../../../public/assets/images/campaignDetails/gallery1/image9.svg";
import img10 from "../../../public/assets/images/campaignDetails/gallery1/image10.svg";
import img11 from "../../../public/assets/images/campaignDetails/gallery1/image11.svg";
import img12 from "../../../public/assets/images/campaignDetails/gallery1/image12.svg";
import redLogo from "../../../public/assets/images/campaignDetails/info-icon@2x.svg";
import CiHomeAskUs from "../../../components/CiHomeAskUs";
import CiHomeSubscribe from "../../../components/CiHomeSubscribe";
import ListingComponent from "../../../components/listingComponent/index";
import DownArrow from "../../../public/assets/images/campaignDetails/down-arrow-icon@2x.svg";
import Download from "../../../public/assets/images/campaignDetails/download.svg";
import ErrorPage from "../../404";
import Loader from "../../../components/Loader";
import NoImg from "../../../public/no-image.png";
import axios from "axios";
// import { useRouter } from 'next/router';

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(
//     ` http://localhost:3000/api/getPosts?post_type=campaigns&post_id=${id}`
//   );
//   const data = await res.json();
//   return { props: { data } };

// }

const CampaignDetails = (props) => {
  console.log("campppppppppp", props);
  const params = useRouter();
  const router = useRouter();
  const { id } = router.query;
  console.log("param----", params);
  const dispatch = useDispatch();
  const [nodata, setNodata] = useState(null);
  const [visible, setVisible] = useState(true);
  const [campaignData, setCampaigncData] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    campaignApiCall(id);
    setVisible(true);
  }, []);

  const campaignDetails2 = useSelector(
    (state) => state?.data?.campaignDetailsFetchData || []
  );

  if (nodata === "NO RECORDS MATCHED SEARCH") {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  const campaignApiCall = (id) => {
    setCampaignDetails(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=campaigns&post_id=${id}`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("res----", res?.data?.data[0]);
        setCampaigncData(res?.data?.data);
        setCampaignDetails(false);
        setVisible(false);
      })
      .catch((err) => {
        setCampaignDetails(false);
        setVisible(false);
        console.log("err+++", err);
      });
  };

  const postsPerPage = 1;
  let newData = campaignData?.slice(
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

  if (campaignDetails) {
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
    <div className={styles.campaign_detail_container}>
      {/* {JSON.stringify(newData)}; */}
      {Array.isArray(newData) &&
        newData?.map((elem, index) => {
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
          // console.log(filterImg, "filterImgforcampaign");

          const imgCredits = elem?.postData?.filter(
            (elem) =>
              elem?.meta_key == "img_credits" || elem.meta_key == "post-auth"
          );

          const imgClickedBy = imgCredits?.map((click) =>
            click?.meta_value
              ? click?.meta_value.replace("citeamci", "CI Team")
              : ""
          );
          // console.log(imgClickedBy, "imgCredits----");
          const mediaupdate = elem?.postData?.filter((item, index) => {
            if (item.meta_key == "campaign_update_source") {
              return item;
            }
          });
          // else (item.meta_key ==  "campaign_update_title") {
          //   return item
          // };
          //   const mediaupdatenew = elem?.postData?.filter((item, index) => {
          //   if (item.meta_key ==  "campaign_update_title") {
          //     return item
          //   }
          // })
          const mediaupdate1 = elem?.postData?.filter((item, index) => {
            if (item.meta_key == "media_updates_3_campaign_update_source") {
              return item;
            }
          });

          // console.log("mediaupdate---", [mediaupdate, mediaupdate1]);

          const filteredArr = [...mediaupdate, ...mediaupdate1].reduce(
            (acc, current) => {
              const x = acc.find(
                (item) => item.meta_value === current.meta_value
              );
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );

          // console.log("++++++=", filteredArr);

          const documentUrl = elem?.postData?.filter((item, index) => {
            if (item?.meta_key === "doc_url") {
              return item;
            }
          });
          const documentTitle = elem?.postData?.filter((item, index) => {
            if (item?.meta_key === "doc_title") {
              return item;
            }
          });

          // console.log(documentUrl[0]?.meta_value, "documentUrl----");
          // console.log(documentTitle[0]?.meta_value, "documentTitle----");
          return (
            <div key={index}>
              <div className={styles.campaign_details_card_container}>
                <div className={styles.campaign_sub_card}>
                  <Row gutter={[32, 32]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      <h1 className={styles.campaign_header}>
                        {elem.post_title}
                      </h1>
                      <div className={styles.campaign_title_bottom}></div>
                      {/* <p
                        className={styles.campaign_content_para}
                        style={{ color: '#ffff' }}
                        dangerouslySetInnerHTML={{
                          __html: elem?.post_data.slice(0, 208),
                        }}
                      ></p> */}
                      <span className={styles.campaign_span_data}>
                        {imgClickedBy}
                      </span>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      {filterImg?.at(-1)?.meta_value !== undefined ? (
                        <Image
                          src={`https://www.conservationindia.org/wp-content/files_mf/${
                            filterImg?.at(-1)?.meta_value
                          }`}
                          alt="alt"
                          width={800}
                          height={500}
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
                          width={600}
                          height={600}
                          className={
                            styles.ci_home_articles_left_content_card_img
                          }
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={styles.campaign_details_content}>
                <Row gutter={[32, 32]}>
                  <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                    <Row className={styles.campaign_details_icons}>
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
                        className={styles.campaign_details_linkedin_icon}
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
                          <Image {...Twitter} alt="TwitterImg" />
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={14} xl={14}>
                    <div
                      className={styles.campaign_paragraph}
                      dangerouslySetInnerHTML={{ __html: elem?.post_data }}
                    />
                  </Col>

                  {/* {1 !== 1 && ( */}
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <div className={styles.campaign_details_media_container}>
                      {1 !== 1 && (
                        <div className={styles.campaign_details_media_updates}>
                          <h1 className={styles.capmaign_main_title}>
                            MEDIA UPDATES
                          </h1>
                          <br />
                          {filteredArr?.map((element, elem1, index) => {
                            return (
                              <>
                                <div className={styles.campaign_content}>
                                  <h3 className={styles.campaign_media_title}>
                                    {element?.meta_value}
                                  </h3>
                                  <p
                                    className={styles.campaign_media_content}
                                    style={{ color: "red" }}
                                  >
                                    <a href="#">{element[0]?.meta_value}</a>
                                    {/* {console.log(
                                        element[0]?.meta_value,
                                        "element-----"
                                      )} */}
                                  </p>
                                </div>
                              </>
                            );
                          })}
                          <div className={styles.campaign_details_load_more}>
                            <button className={styles.load_more_button}>
                              View More{" "}
                              <Image
                                alt="DownArrow"
                                {...DownArrow}
                                className={styles.down_arrow_icon}
                              />
                            </button>
                          </div>
                        </div>
                      )}
                      {documentUrl[0]?.meta_value !== "" && (
                        <>
                          <div
                            className={styles.campaign_details_download_section}
                          >
                            <div className={styles.campaign_download}>
                              Download Document
                            </div>
                            <div
                              className={styles.download_border_bottom}
                            ></div>
                            <div className={styles.campaign_download_desc}>
                              {documentTitle[0]?.meta_value}
                            </div>
                            <div
                              className={
                                styles.campaign_download_button_wrapper
                              }
                            >
                              <button className={styles.download_button}>
                                <Image
                                  alt="DownArrow"
                                  {...Download}
                                  className={styles.down_arrow_icon}
                                />
                                <a
                                  href={documentUrl[0]?.meta_value}
                                  style={{
                                    color: "#1F1A17",
                                    paddingRight: "0.3rem",
                                  }}
                                >
                                  Download PDF
                                </a>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                  {/* )} */}

                  {/* md end here */}
                </Row>
              </div>

              <div className={styles.campaign_details_image_container}>
                {/* <h3 className={styles.campaign_details_image_heading}>Image gallery</h3>
                <div className={styles.campaign_details_image_border}></div>
                <p className={styles.campaign_details_image_subheading}>
                  There are many variations of passages of Lorem Ipsum available, but
                  the majority have suffered alteration in some form, by injected
                  humour.
                </p>

                <ListingComponent
                  style={{ width: "100%", margin: 0 }}
                  data={campaignDetails?.result?.data}
                  pageName="campaign-details"
                  title={false}
                /> */}

                <Divider style={{ width: "100%", margin: "0 0 4.rem" }} />
                <div className={styles.tag_button_container}>
                  {elem?.tags?.map((item, index) => (
                    <button
                      onClick={() => params.push(`/tags/${item.slug}`)}
                      key={index}
                      className={styles.tag_button}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* <CiHomeAskUs /> */}
              <CiHomeSubscribe />
            </div>
          );
        })}
      {nodata !== "NO RECORDS MATCHED SEARCH" && <></>}
    </div>
  );
};

export default CampaignDetails;
