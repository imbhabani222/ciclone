import { Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./authors.module.css";

export async function getServerSideProps(context) {
  const authorRes = await fetch(` https://ci-demo.hutechweb.com/api/getUserl2`);

  const authorData = await authorRes.json();

  return {
    props: {
      authorData,
    }, // will be passed to the page component as props
  };
}

function Authors(props) {
  const params = useRouter();
  const [authorsData, setAuthorsData] = useState([]);
  props?.authorData?.filter((item) => item?.meta_key == "userphoto_image_file");
  console.log("props?.authorData", props?.authorData);
  useEffect(() => {
    setAuthorsData(props?.authorData);
  }, [props]);
  return (
    <div className={styles.container}>
      <Row className={styles.author_name_row}>
        <Col className={styles.title}>
          <div>OUR AUTHORS</div>
          <div className={styles.border_bottom_line}></div>
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        justify="space-arround"
        className={styles.card_row}
      >
        {authorsData
          ?.filter(
            (elem) => elem?.user_id !== "5436" && elem?.user_id !== "1050"
          )

          ?.filter((obj) =>
            obj?.user_meta_data?.some(
              (itm) => itm?.meta_key === "userphoto_image_file"
            )
          )
          ?.map((item, index) => {
            const itrmImg = item?.user_meta_data?.filter((_it) => {
              if (_it?.meta_key === "userphoto_image_file") {
                return _it?.meta_value;
              }
            });

            return (
              <Col
                onClick={() =>
                  params.push(
                    `/authorDetails/${item?.user_id}?${item?.first_name
                      ?.split(" ")
                      .join("-")}-${item?.last_name?.split(" ").join("-")}`
                  )
                }
                xl={6}
                lg={6}
                md={8}
                sm={24}
                xs={24}
                key={index}
              >
                <div className={styles.card}>
                  <div className={styles.user_profile_name}>
                    {!itrmImg?.at(0)?.meta_value ? (
                      <span className={styles.user_profile_name_span}>
                        {item?.first_name?.charAt(0)?.toUpperCase()}
                      </span>
                    ) : (
                      <Image
                        src={`https://www.conservationindia.org/wp-content/files_mf/userphoto/${
                          itrmImg?.at(0)?.meta_value
                        }`}
                        alt="alt"
                        width={200}
                        height={150}
                        // layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        className={styles.top_container_img}
                      />
                    )}
                  </div>
                  <div className={styles.author_name}>
                    {item?.first_name + " " + item?.last_name}
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Authors;
