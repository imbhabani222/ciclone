import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import ArrowRight from "../../public/assets/images/Red-Arrow.svg";
import styles from "./index.module.css";
import Image from "next/image";

function CiHomeAskUs(props) {
  console.log("inside++++++=", props);
  const dispatch = useDispatch();
  let Userdata = useSelector((state) => state.data.addUserData.result || []);
  // console.log(Userdata);
  const [askData, setAskData] = useState({
    username: "",
    email: "",
    question: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setAskData({ ...askData, [name]: value });
  };
  const clearState = () => {
    setAskData({
      username: "",
      email: "",
      question: "",
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log(askData);
    dispatch({ type: "ADD_USERDATA", payload: askData });
    clearState();
  };
  return (
    <div className={styles.ci_home_connect_container}>
      <Row className={styles.ci_home_connect_ask_querry_container}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className={styles.ci_home_connect_ask_querry_left_card}
        >
          <div className={styles.ci_home_connect_ask_querry_heading_container}>
            <div className={styles.ci_home_connect_ask_querry_heading}>
              Ask CI
            </div>
            <div
              className={
                styles.ci_home_connect_ask_querry_heading_bottom_border
              }
            ></div>
          </div>
          <div className={styles.ci_home_connect_ask_querry_subheading}>
            Ask us any question related to wildlife conservation in India and we
            will answer it after consulting with our panel of experts.
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className={styles.ci_home_connect_ask_querry_right_card}
        >
          <Input
            type="text"
            value={askData.username}
            name="username"
            style={{
              backgroundColor: "#35312E",
              border: "1px solid #35312E",
              color: "white",
            }}
            size="large"
            placeholder="Name"
            onChange={handleChange}
          />
          <Input
            type="email"
            value={askData.email}
            name="email"
            size="large"
            placeholder="Email Address (will not be published)"
            onChange={handleChange}
            style={{
              backgroundColor: "#35312E",
              border: "1px solid #35312E",
              color: "white",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextArea
            type="text"
            value={askData.question}
            name="question"
            style={{
              backgroundColor: "#35312E",
              border: "1px solid #35312E",
              color: "white",
            }}
            rows={4}
            placeholder="Question"
            onChange={handleChange}
          />
          <div className={styles.ci_home_connect_ask_us_btn_wrapper}>
            <button
              className={styles.ci_home_connect_ask_us_btn}
              onClick={handelSubmit}
            >
              Submit{" "}
              <Image
                alt="alt"
                // placeholder="blur"
                {...ArrowRight}
                className={styles.ask_us}
              />
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CiHomeAskUs;
