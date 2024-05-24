import React from "react";
import Image from "next/image";

import { List, Col, Row, Input, Form, Avatar } from "antd";
import TextArea from "antd/lib/input/TextArea";
import styles from "./landscapeDetails.module.css";
import Facebook from "../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedIn from "../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import Twitter from "../../public/assets/images/socialIcons/twitter@2x.svg";
import landscapeHero from "../../public/assets/images/landscapeDetails/landscape_hero.svg";
import ArrowRight from "../../public/assets/images/homeImgs/arrow-right-red.png";
import CiHomeSubscribe from "../../components/CiHomeSubscribe";
import CiHomeAskUs from "../../components/CiHomeAskUs";

const LandscapeDetails = () => {
  const data = Array.from({
    length: 1,
  }).map((_, i) => ({
    title: `What is forest landscape restoration?`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "A landscape is an area with varied land uses, such as natural forests, secondary forests, timber plantations, farmland and degraded lands. ",
  }));
  const titleData = [
    {
      title: "Divya Khosla",
    },
    {
      title: "Priya Singh",
    },
    {
      title: "Swapna Reddy",
    },
    {
      title: "Zoya Farooqui",
    },
  ];
  return (
    <div className={styles.landscape_detail_container}>
      <div className={styles.topic_details_card}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <Image
                  className={styles.landscape_details_image_mobile_view}
                  alt="logo"
                  {...landscapeHero}
                />
              }
            >
              <List.Item.Meta
                // title={
                //   <p
                //     classname={styles.landscape_details_title}
                //   >
                //     {item.title}
                //   </p>
                // }
                title={
                  <p className={styles.titles_data}>
                    {item.title}
                    {/* <div
                      className={styles.topic_details_page_images_bottom_border}
                    ></div> */}
                  </p>
                }
              />
              <div className={styles.landscape_detail_bottom_border}></div>
              <p className={styles.topic_details_content}>{item.content}</p>
            </List.Item>
          )}
        />
      </div>
      <div className={styles.landscape_details_content}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <Row>
              <Col xs={8} sm={8} md={24} lg={24} xl={24}>
                <a 
                    href="#"
                    onClick={()=> window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/#`,
                      '_blank', 'location=yes,height=800,width=800,scrollbars=yes,status=yes'
                    )}
                  >
                    <Image {...Facebook} alt="Facebook" />
                </a> 
              </Col>
              <Col
                xs={8}
                sm={8}
                md={24}
                lg={24}
                xl={24}
                className={styles.landscape_details_linkedin_icon}
              >
                <a 
                  href="#"
                  onClick={()=> window.open(
                    `https://www.linkedin.com/cws/share?url=${window.location.href}/#`,
                    '_blank', 'location=yes,height=800,width=800,scrollbars=yes,status=yes'
                  )}
                >
                  <Image {...LinkedIn} alt="LinkedIn" />
                </a>
              </Col>
              <Col xs={8} sm={8} md={24} lg={24} xl={24}>
              <a 
                href="#"
                onClick={()=> window.open(
                  `https://twitter.com/intent/tweet?text=${window.location.href}/#`,
                  '_blank', 'location=yes,height=800,width=800,scrollbars=yes,status=yes'
                )}
              >
                <Image {...Twitter} alt="TwitterImg" />
              </a>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <p className={styles.landscape_paragraph}>
              FLR is far more comprehensive than conventional forest restoration
              approaches in analyzing local contexts and designing interventions
              for multiple purposes. It considers landscape objectives and the
              impacts of and on different stakeholders. <br></br>
              <br></br>
              FLR goes far beyond planting trees and simply increasing forest
              cover. By contrast, many large-scale restoration programs in Asia
              have focused on fast-growing, exotic species and timber
              production. This led to valid criticism over their claims of
              improving forest quality and human well-being. <br></br>
              <br></br>
              Another distinguishing feature of FLR is that stakeholders in the
              landscape participate throughout the process. FLR works with
              stakeholders to identify and address the root causes of
              deforestation and forest degradation, and to jointly develop
              solutions. FLR processes emphasize local needs and national
              priorities equally. They acknowledge that top-down approaches will
              be counterproductive in the medium to long term. This contrasts
              with many traditional restoration initiatives in Asia that focused
              insufficiently on stakeholder engagement, if at all.<br></br>
              <br></br>
              FLR also differs from other approaches in the way it recognizes
              complexity and uncertainty. Local needs, priorities and patterns
              of resource use change over time. External influences such as
              climate change, market forces and policies make them even less
              predictable. FLR needs to be grounded in an adaptive management
              process that includes iterative monitoring and learning. This was
              not often the choice of large-scale top-down restoration projects.
            </p>
            <div className={styles.landscape_detail_center_div}>
              <h3 className={styles.landscape_detail_sub_header}>
                Landscape project: Location
              </h3>
              <p className={styles.landscape_detail_letter}>
                Sub: Arunachal Pradesh’s Dibang Valley Must Be Saved from
                Destruction <br></br>
                <br></br>
                The proposal for the Etalin Hydro-Electric Project (3097 MW) in
                Arunachal Pradesh’s Dibang Valley (RO/Ministry File Number F.
                No. 8-20/2014-FC), was placed for approval before the Forest
                Advisory Committee on the 23rd of April, 2020. Long-term
                research in Dibang Valley (including areas which will see
                impacts of the proposed hydro-project) show that the region is a
                very important habitat for many Schedule I endangered species,
                including a genetically distinct population of tigers, 75
                species of other mammals and over 300 species of birds.{" "}
                <br></br>
                <br></br>
                The proposed hydro-electric project is, in my opinion,
                detrimental to India’s biodiversity and ecological security, and
                therefore I respectfully request that the FAC reject it.
                <br></br>
                <br></br>
                Yours truly, The undersigned
              </p>
            </div>

            <div className={styles.landscape_detail_center_divs}></div>

            <div className={styles.landscape_detail_center_div}>
              <h3 className={styles.landscape_detail_sub_header}>
                Area Covered
              </h3>
              <p className={styles.landscape_detail_letter}>
                Sub: Arunachal Pradesh’s Dibang Valley Must Be Saved from
                Destruction <br></br>
                <br></br>
                The proposal for the Etalin Hydro-Electric Project (3097 MW) in
                Arunachal Pradesh’s Dibang Valley (RO/Ministry File Number F.
                No. 8-20/2014-FC), was placed for approval before the Forest
                Advisory Committee on the 23rd of April, 2020. Long-term
                research in Dibang Valley (including areas which will see
                impacts of the proposed hydro-project) show that the region is a
                very important habitat for many Schedule I endangered species,
                including a genetically distinct population of tigers, 75
                species of other mammals and over 300 species of birds.{" "}
                <br></br>
                <br></br>
                The proposed hydro-electric project is, in my opinion,
                detrimental to India’s biodiversity and ecological security, and
                therefore I respectfully request that the FAC reject it.
                <br></br>
                <br></br>
                Yours truly, The undersigned
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <p className={styles.landscape_details_authors}>Similar Authors</p>
            <p className={styles.topic_details_subparagraph}>
              New to Conservation India? Here is a curated list of tips and
              educational reading material.
            </p>
            <List
              itemLayout="horizontal"
              dataSource={titleData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://i.pinimg.com/originals/3d/7c/76/3d7c76a706a82c783e7717ccecb88692.jpg" />
                    }
                    title={<a href="">{item.title}</a>}
                    description="13 Articles • 2 Case Studies"
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
      <CiHomeAskUs />
      <CiHomeSubscribe />
    </div>
  );
};

export default LandscapeDetails;
