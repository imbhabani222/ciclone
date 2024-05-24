import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  List,
  Col,
  Row,
  Avatar,
  Divider,
  Button,
  Select,
  Spin,
  Input,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "../essentialdetails.module.css";
import TextArea from "antd/lib/input/TextArea";
import ArrowRight from "../../../public/assets/images/homeImgs/arrow-right-red.png";
import Facebook from "../../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedIn from "../../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import Twitter from "../../../public/assets/images/socialIcons/twitter@2x.svg";
import essentialImg from "../../../public/assets/images/essentiallistImgs/essentialdetailsbanner.svg";
import axios from "axios";
import CiHomeAskUs from "../../../components/CiHomeAskUs";
import CiHomeSubscribe from "../../../components/CiHomeSubscribe";
import { useRouter } from "next/router";
import NoImg from "../../../public/no-img.png";
import ErrorPage from "../../404";
import Loader from "../../../components/Loader";
const { Option } = Select;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const res = await fetch(
    ` http://localhost:3000/api/getPosts?post_type=essentials&post_id=${id}`
  );
  const data = await res.json();
  return { props: { data } };
}

const EssentialDetails = (props) => {
  const params = useRouter();
  console.log("props+++++++++", props);
  const [tips, setTips] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);
  const titleData = [
    {
      title: "Divya Khosla",
    },
  ];
  const [essentialDetails, setEssentialDetails] = useState([]);
  useEffect(() => {
    setEssentialDetails(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);
  const [essentialDetailsData, setEssentilsDetailsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [visible, setVisible] = useState(true);

  const relatedImagesApiCall = (id) => {
    setEssentialDetails(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=essentials&post_id=${id}`
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setEssentilsDetailsData(res?.data?.data);
        setEssentialDetails(false);
        setVisible(false);
      })
      .catch((err) => {
        setEssentialDetails(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  useEffect(() => {
    relatedImagesApiCall(id);
    setVisible(true);
  }, []);

  const postsPerPage = 6;
  const [number, setNumber] = useState(1);
  let newData = essentialDetailsData?.slice(
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

  if (essentialDetails) {
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

  if (essentialDetailsData === "NO RECORDS MATCHED SEARCH") {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }
  return (
    <div className={styles.essential_details_page}>
      {newData?.map((item, index) => {
        const filterImg = item?.postData?.filter(
          (elem) =>
            elem?.meta_key == "_wp_attached_file" ||
            elem.meta_key == "post_image"
        );

        const authorShortBio = item?.author?.user_meta_data?.filter((elem) => {
          if (elem?.meta_key === "authorshortbio") {
            return elem;
          }
        });
        // console.log(filterImg, "+++++++++++++");
        return (
          <div key={index}>
            <div className={styles.campaign_details_card_container}>
              <div className={styles.campaign_sub_card}>
                <Row gutter={[32, 32]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <h1 className={styles.campaign_header}>
                      {item?.post_title}
                    </h1>
                    <div className={styles.campaign_title_bottom}></div>
                    <p className={styles.campaign_content_para}>
                      {item?.author?.first_name + " " + item?.author?.last_name}
                    </p>
                    <span className={styles.campaign_span_data}>
                      {/* {authorShortBio[0]?.meta_value} */}
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    {filterImg?.length !== 0 ? (
                      <>
                        {filterImg?.map((elem, index) => {
                          if (index == 0) {
                            return (
                              <>
                                <Image
                                  src={`https://www.conservationindia.org/wp-content/files_mf/${elem.meta_value}`}
                                  alt="alt"
                                  width={800}
                                  height={800}
                                  className={
                                    styles.ci_home_articles_left_content_card_img
                                  }
                                />
                              </>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <Image
                        src={NoImg}
                        alt="alt"
                        width={800}
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
            <div className={styles.essential_details_content}>
              <Row gutter={[32, 32]}>
                <Col
                  xs={24}
                  sm={24}
                  md={2}
                  lg={2}
                  xl={2}
                  className={styles.essential_details_column}
                >
                  <div>
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
                        className={styles.essential_details_linkedin_icon}
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
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={16}
                  lg={16}
                  xl={16}
                  className={styles.essential_details_column}
                >
                  <div className={styles.essential_container}>
                    <p
                      className={styles.essentail_details_paragraph}
                      dangerouslySetInnerHTML={{ __html: item?.post_data }}
                    ></p>
                  </div>

                  <div className={styles.tag_button_container}>
                    {item?.tags?.map((item, index) => (
                      <button
                        onClick={() => params.push(`/tags/${item.slug}`)}
                        key={index}
                        className={styles.tag_button}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  {1 !== 1 && (
                    <div>
                      {item?.comments?.length > 0 && (
                        <div>
                          <h3 className={styles.essential_details_comment}>
                            Comments
                          </h3>
                          <div className={styles.essential_details_sort}>
                            <p
                              className={
                                styles.essential_details_comment_paragraph
                              }
                            >
                              {essentialDetailsData?.comments?.length} comments
                            </p>
                            {/* <div className={styles.essentail_details_sorting}>
                                <p className={styles.essential_paragraph}>
                                  Sortby :
                                  <select
                                    defaultValue="oldest"
                                    className={styles.essential_details_select}
                                  >
                                    <option value="oldest">Oldest</option>
                                  </select>
                                </p>
                              </div> */}
                          </div>
                          <div>
                            {essentialDetailsData?.comments?.map(
                              (item, index) => {
                                return (
                                  <List
                                    key={index}
                                    itemLayout="horizontal"
                                    dataSource={titleData}
                                    renderItem={(item) => (
                                      <List.Item>
                                        <List.Item.Meta
                                          avatar={
                                            <Avatar src="https://i.pinimg.com/originals/3d/7c/76/3d7c76a706a82c783e7717ccecb88692.jpg" />
                                          }
                                          title={<a href="">{item.title}</a>}
                                          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                                        />
                                      </List.Item>
                                    )}
                                  />
                                );
                              }
                            )}
                          </div>
                          <Divider />
                          <List
                            itemLayout="horizontal"
                            dataSource={titleData}
                            renderItem={(item) => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={
                                    <Avatar src="https://i.pinimg.com/originals/3d/7c/76/3d7c76a706a82c783e7717ccecb88692.jpg" />
                                  }
                                  // title={<a href="">{item.title}</a>}
                                  // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                                />
                                <Input
                                  size="large"
                                  placeholder="Add a comment..."
                                  className={styles.essential_details_input}
                                />
                              </List.Item>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Col>

                <Col
                  xs={24}
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
                  className={styles.essential_details_column}
                >
                  <p className={styles.topic_details_authors}>Tips and More</p>
                  <p className={styles.topic_details_subparagraph}>
                    New to Conservation India? Here is a curated list of tips
                    and educational reading material.
                  </p>
                  <div>
                    {tips.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => params.push("/tips")}
                          className={styles.essential_details_container}
                        >
                          <div className={styles.essential_details_tips}>
                            {item}
                          </div>
                          <div className={styles.essential_details_arrow}>
                            <ArrowRightOutlined />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.essential_details_ask_us_btn_wrapper}>
                    <button
                      onClick={() => params.push("/tips")}
                      className={styles.essential_details_ask_us_btn}
                    >
                      View More <Image {...ArrowRight} alt="ArrowRight" />
                    </button>
                  </div>
                </Col>
              </Row>
              <Divider />
            </div>
            {/* <CiHomeAskUs /> */}
            <CiHomeSubscribe />
          </div>
        );
      })}
    </div>
    // null
  );
};
export default EssentialDetails;
