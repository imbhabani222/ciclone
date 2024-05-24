import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ArrowRight from "../../public/assets/images/White-Arrow.svg";
import Image from "next/image";

function CiHomeSubscribe() {
  const dispatch = useDispatch();
  let emailAdd = useSelector((state) => state.data.addEmail.result || []);
  // console.log(emailAdd);
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log(email);
    dispatch({ type: "ADD_EMAIL", payload: { email: email } });
    setEmail("");
  };
  return (
    <div className={styles.ci_home_subscribe_container}>
      <div className={styles.ci_home_subscribe_heading}>
        Subscribe to our Newsletter
      </div>
      <div className={styles.ci_home_subscribe_heading_bottom_border}></div>
      <div className={styles.ci_home_subscribe_subheading}>
        Want to stay in touch with our latest articles and posts? Subscribe to
        get Conservation India posts right in your inbox.
      </div>
      <div id="subscribe" className={styles.ci_home_subscribe_input}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter Email Address*"
          style={{
            borderRadius: "30px",
            backgroundColor: "#F4F4F3",
            height: 46,
            padding: "0.6rem",
          }}
          className={styles.input}
          suffix={
            <Image
              onClick={handelSubmit}
              alt="alt"
              // placeholder="blur"
              className={styles.ci_home_subscribe_email_send_btn}
              {...ArrowRight}
              height={35}
              width={35}
            />
          }
        />
      </div>
    </div>
  );
}

export default CiHomeSubscribe;
