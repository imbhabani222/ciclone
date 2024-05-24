import { Spin } from "antd";
import React from "react";
import styles from "./index.module.css";

function Loader() {
  return (
    <div
      style={{
        marginTop: "9rem",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <Spin size="large"></Spin>
        <div className={styles.loadertext}>Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
