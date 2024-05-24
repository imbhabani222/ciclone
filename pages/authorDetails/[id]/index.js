import { Col, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "../index.module.css";
import Img from "../../../public/assets/images/homeImgs/prerna.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../../../components/Loader";
import NoImg from "../../../public/no-img.png";
// import axios from "axios";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const res = await fetch(
    ` http://localhost:3000/api/getPosts?post_author=${id}`
  );
  const data = await res.json();
  return { props: { data } };
}

function AuthorDetail(props) {
  const ref = useRef(null);
  const param = useRouter();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(true);

  const authorApiCall = (id) => {
    setLoader(true);
    axios
      .get(` https://ci-demo.hutechweb.com/api/getPosts?post_author=${id}`)
      .then((res) => {
        // console.log("res+++++", res);
        setData(res?.data?.data);
        setLoader(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoader(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const postsPerPage = 4;
  const [number, setNumber] = useState(1);
  let newData = data?.slice((number - 1) * postsPerPage, postsPerPage * number);
  console.log(newData);
  const handlePage = (pageNumber) => {
    setNumber(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    authorApiCall(id);
    setVisible(true);
  }, []);

  if (loader) {
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
      {newData?.slice(0, 1)?.map((item, index) => {
        const authShortBio = item?.author?.user_meta_data?.filter(
          (elem, ind) => {
            if (elem?.meta_key === "author_short_bio") {
              return elem;
            }
          }
        );

        const designation = item?.author?.user_meta_data?.filter(
          (item, index) => {
            if (item?.meta_key === "designation") {
              return item;
            }
          }
        );
        const filterImg = item?.postData?.filter((elem) => {
          if (
            elem?.meta_key === "_wp_attached_file" &&
            elem?.meta_value !== ""
          ) {
            return elem;
          } else if (elem.meta_key == "post_image") {
            return elem;
          }
        });
        return (
          <div key={index}>
            <Row className={styles.author_name_row}>
              <Col className={styles.author_name}>
                <div>
                  {item?.author?.first_name + " " + item?.author?.last_name}
                </div>
                <div className={styles.border_bottom_line}></div>
              </Col>
            </Row>
            <Row>
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={24}
                xs={24}
                className={styles.author_profile_container}
              >
                <div className={styles.author_img}>
                  {filterImg.length > 0 ? (
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
                              height={200}
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
                        height={200}
                        className={
                          styles.ci_home_essentials_left_content_card_img
                        }
                      />
                    </>
                  )}
                </div>
                <div className={styles.author_name_left}>
                  {item?.author?.first_name + " " + item?.author?.last_name}
                </div>
                <div className={styles.author_subheading_left}>
                  {designation[0]?.meta_value ?? "Founder"}
                </div>
                <div
                  className={styles.number_of_posts}
                  onClick={() =>
                    ref.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    })
                  }
                >
                  Created Posts : <b>{data?.length}</b>
                </div>
              </Col>
              <Col
                xl={16}
                lg={16}
                md={16}
                sm={24}
                xs={24}
                className={styles.author_details_container}
              >
                <div className={styles.author_short_details}>
                  {authShortBio[0]?.meta_value}
                </div>
                <div className={styles.more_about_author_heading}>
                  More About Author
                </div>
                <div className={styles.more_about_author_details}>
                  {/* <p>{authShortBio[0]?.meta_value} </p> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.author?.description,
                    }}
                  ></p>
                </div>
                <div ref={ref} className={styles.author_all_posts}>
                  <div className={styles.more_abt_author_heading}>
                    Posts by{" "}
                    {item?.author?.first_name + " " + item?.author?.last_name}
                  </div>
                  {newData?.map((item, index) => {
                    return (
                      <div
                        onClick={() =>
                          param.push(
                            `/${item?.post_type}-details/${
                              item.post_id
                            }?${item?.post_title?.split(" ").join("-")}`
                          )
                        }
                        key={index}
                        className={styles.author_post_card}
                      >
                        <div className={styles.post_name}>
                          {item?.post_title}
                        </div>
                        <div className={styles.post_article}>
                          {item?.post_type?.toUpperCase()} |{" "}
                          {item?.post_date?.slice(0, 15)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
}

export default AuthorDetail;
