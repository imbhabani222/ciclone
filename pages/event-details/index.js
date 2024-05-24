import React, { useState } from "react";
import Image from "next/image";
import {
  List,
  Col,
  Row,
  Input,
  Form,
  Avatar,
  Card,
  Select,
  Divider,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import styles from "./eventDetails.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import UserImg from "../../public/assets/images/galleryDetails/user-img.svg";
import Facebook from "../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedIn from "../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import Twitter from "../../public/assets/images/socialIcons/twitter@2x.svg";
import eventImg1 from "../../public/assets/images/eventDetails/event-img1.svg";
import eventImg2 from "../../public/assets/images/eventDetails/event-img2.svg";
import eventImg3 from "../../public/assets/images/eventDetails/event-img3.svg";

import CiHomeAskUs from "../../components/CiHomeAskUs";
import CiHomeSubscribe from "../../components/CiHomeSubscribe";
const { Option } = Select;

const EventDetails = () => {
  const data = Array.from({
    length: 1,
  }).map((_, i) => ({
    title: `Foundation Training Program on the Practice of Ecological Restoration`,
  }));
  const [comments, setComments] = useState([
    {
      img: UserImg,
      name: "Divya Khosla",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
  ]);
  const titleData = [
    {
      title: "Divya Khosla",
    },
  ];
  return (
    <div className={styles.event_detail_container}>
      <div className={styles.event_details_card}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <Image
                  style={{ height: "100%", width: "100%" }}
                  alt="logo"
                  {...eventImg1}
                />
              }
            >
              <List.Item.Meta
                title={
                  <a
                    className={styles.event_detail_main_heading}
                    href={item.href}
                  >
                    {item.title}
                  </a>
                }
              />
              <div className={styles.event_detail_bottom_border}></div>
            </List.Item>
          )}
        />
      </div>
      <div className={styles.event_details_content}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={2} lg={2} xl={2}>
            <Row className={styles.event_details_icons}>
              <Col xs={8} sm={8} md={24} lg={24} xl={24}>
                <Image
                  {...Facebook}
                  alt="Facebook"
                  style={{ cursor: "pointer" }}
                />
              </Col>
              <Col
                xs={8}
                sm={8}
                md={24}
                lg={24}
                xl={24}
                className={styles.event_details_linkedin_icon}
              >
                <Image
                  {...LinkedIn}
                  alt="LinkedIn"
                  style={{ cursor: "pointer" }}
                />
              </Col>
              <Col xs={8} sm={8} md={24} lg={24} xl={24}>
                <Image
                  {...Twitter}
                  alt="Twitter"
                  style={{ cursor: "pointer" }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <p className={styles.event_paragraph}>
              This is conducted by the Center for Ecological Landscapes at BNCA
              (Dr Bhanuben Nanavati College of Architecture), Pune, in
              collaboration with the Society for Ecological Restoration, the
              leading international organization on ecological restoration, and
              Junglescapes Charitable Trust, Bangalore.
              <h5>See program poster below.</h5>
              Programme will introduce participants to the principles, concepts
              and practice of ecological restoration, through indoor sessions,
              site visits, hands-on field training and web-based inputs from
              international experts.<br></br>
              {/* <br></br>
              <br></br> */}
              <h5>Who is it for?</h5>
              For anyone interested in ecological restoration including
              students, academicians, practitioners, professionals and NGOs
              (Landscape architects, Ecological restoration practitioners,
              Environmental sciences graduates, Ecologists, Botanists, etc.)
              <h5>Program duration</h5>
              The program will be conducted on 8 weekends (Saturdays and
              Sundays) starting 8th February 2020 and shall end on 29th March
              2020, and will consist of 24 hours of classroom sessions and 36
              hours of field sessions. Classroom sessions will consist of
              lectures, case studies and group work.
              <h5>Content</h5>
              The program will cover a variety of topics including ecological
              restoration principles and concepts, understanding degradation,
              restoration of abiotic and biotic components of an ecosystem,
              international standards and best practices, restoration project
              management and field techniques, management of invasive species,
              integrating ecological restoration into landscape architecture,
              etc.
            </p>
            <div className={styles.event_detail_center_div}>
              <h3 className={styles.event_detail_sub_header}>Venue</h3>
              <br></br>
              <p className={styles.event_detail_letter}>
                Dr Bhanuben Nanavati College of Architecture for Women, Maharshi
                Karve Stree Shikshan Samstha, Karve Nagar, Pune
              </p>
              <br></br>
              <h3 className={styles.event_detail_sub_header}>Fees</h3>
              <br></br>
              <p className={styles.event_detail_letter}>
                Program Fee – Rs 26500 (including GST) SER Membership – US $ 25
                Travel costs for field trips – Rs 5000
              </p>
              <br></br>
              <h3 className={styles.event_detail_sub_header}>Registration</h3>
              <br></br>
              <p className={styles.event_detail_letter}>
                The registration details about the programme are given in the
                poster attached herewith.
                <br></br>
                <br></br>
                Please click the below link for registration:
                <p className={styles.event_detail_link}>
                  {" "}
                  https://forms.gle/yWs9eAJ7HD5iABnb9
                </p>
                <br></br>
                Last date for registration: 3rd February 2020. In case of any
                queries please contact the coordinators.
              </p>
              <br></br>
              <h3 className={styles.event_detail_sub_header}>Coordinators</h3>
              <br></br>
              <p className={styles.event_detail_letter}>
                Dr. Swati Sahasrabudhe 0-9850986751,
                swatisahasrabudhe.bnca@gmail.com
                <br></br>
                <br></br>
                Ramesh Venkatraman <br></br>
                0-9789844009,ramesh@junglescapes.org
                <br></br>
                <br></br>
                Kaustubh Moghe <br></br>
                0-9850004009,moghe.kaustubh@gmail.com
                <br></br>
                <br></br>
              </p>
              <h3 className={styles.event_detail_sub_header}>
                Assistant Coordinators
              </h3>
              <br></br>
              <p className={styles.event_detail_letter}>
                Neha Adkar <br></br>
                0-9146062185, neha.adkar@bnca.ac.in
                <br></br>
                <br></br>
                Anupama Khatavkar <br></br>
                0-9423013983, anupama.khatavkar@bnca.ac.in
                <br></br>
                <br></br>
              </p>
            </div>
            <div className={styles.event_detail_center_divs}>
              <Image
                style={{ width: "100%", height: "100%" }}
                {...eventImg2}
                alt="event img"
              />
            </div>
            <div className={styles.event_detail_center_divs}>
              <Image
                style={{ width: "100%", height: "100%" }}
                {...eventImg3}
                alt="event 3"
              />
            </div>
            <div className={styles.event_details_comment_section}>
              <h3 className={styles.event_details_comment}>Comments</h3>
              <div className={styles.event_details_sort}>
                <p className={styles.event_details_comment_paragraph}>
                  2 comments
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
                        <CaretDownOutlined style={{ color: "#1F1A17" }} />
                      }
                    >
                      <Select.Option value="oldest">Oldest</Select.Option>
                      <Select.Option value="newest">Newest</Select.Option>
                    </Select>
                  </div>
                </div> */}
              </div>

              {/* <List
                itemLayout="horizontal"
                dataSource={titleData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://i.pinimg.com/originals/3d/7c/76/3d7c76a706a82c783e7717ccecb88692.jpg" />
                      }
                      title={
                        <p href="" className={styles.article}>
                          {item.title}
                        </p>
                      }
                      description={
                        <p className={styles.vide0_details_subpara}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt.
                        </p>
                      }
                    />
                  </List.Item>
                )}
              /> */}
              <div className={styles.event_details_content_comments}>
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

              {/* <div className={styles.add_comment}>
                <div style={{ width: "60px", height: "60px" }}>
                  <Image alt="UserImg" {...UserImg} height={60} width={60} />
                </div>
                <div style={{ width: "83%" }}>
                  <Input
                    placeholder="add a comment.."
                    className={styles.Add_comment_input_box}
                  />
                </div>
              </div> */}
            </div>
            {/* <div>
              <h3 className="event_details_comment">Comments</h3>
              <div className="event_details_sort">
                <p className="event_details_comment_paragraph">2 comments</p>
                <Form.Item name="sortBy" label="Sortby:">
                  <Select defaultValue="oldest">
                    <Option value="oldest">Oldest</Option>
                  </Select>
                </Form.Item>
              </div>

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
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />
                  </List.Item>
                )}
              />
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
                    />
                    <Input size="large" placeholder="Add a comment..." />
                  </List.Item>
                )}
              />
            </div> */}
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Card className={styles.event_card}>
              <div className={styles.event_card_heading}>From:</div>
              <p className={styles.event_card_para}>February 8, 2020</p>
              <div className={styles.event_card_heading}>To:</div>
              <p className={styles.event_card_para}>March 29, 2020</p>
              <div className={styles.event_card_heading}>Location:</div>
              <p className={styles.event_card_para}>
                Dr Bhanuben Nanavati College of Architecture for Women, Maharshi
                Karve Stree Shikshan Samstha, Karve Nagar
              </p>
              <div className={styles.event_card_heading}>City:</div>
              <p className={styles.event_card_para}>Pune</p>
            </Card>
          </Col>
        </Row>
      </div>
      <CiHomeAskUs />
      <CiHomeSubscribe />
    </div>
  );
};

export default EventDetails;
