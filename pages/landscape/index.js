import React, { Fragment, useState } from "react";
import styles from "./landscapeListing.module.css";
import { Col, Row, Pagination } from "antd";
import img1 from "../../public/assets/images/landscapeListingImgs/landscape-img1.svg";
import img2 from "../../public/assets/images/landscapeListingImgs/landscape-img2.svg";
import img3 from "../../public/assets/images/landscapeListingImgs/landscape-img3.svg";
import img4 from "../../public/assets/images/landscapeListingImgs/landscape-img4.svg";
import img5 from "../../public/assets/images/landscapeListingImgs/landscape-img5.svg";
import img6 from "../../public/assets/images/landscapeListingImgs/landscape-img6.svg";
import img7 from "../../public/assets/images/landscapeListingImgs/landscape-img7.svg";
import img8 from "../../public/assets/images/landscapeListingImgs/landscape-img8.svg";
import img9 from "../../public/assets/images/landscapeListingImgs/landscape-img9.svg";
import img10 from "../../public/assets/images/landscapeListingImgs/landscape-img10.svg";
import img11 from "../../public/assets/images/landscapeListingImgs/landscape-img11.svg";
import img12 from "../../public/assets/images/landscapeListingImgs/landscape-img12.svg";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import ListingComponent from "../../components/listingComponent";

const Landscape = () => {
  const [landscapeListingData, setLandscapeListingData] = useState([
    {
      title: "What is forest landscape restoration?",
      img: img1,
    },
    {
      title:
        "Foundation Training Program on the Practice of Ecological Restoration ",
      img: img2,
    },
    {
      title:
        "Bangalore Lake Census Workshop — Venkatappa Art Gallery, Bengaluru",
      img: img3,
    },
    {
      title: "Goa Bird Festival — Valpoi, Goa",
      img: img4,
    },
    {
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      img: img5,
    },
    {
      title:
        "Talk by Dr. Ajit Kumar, India’s Leading Primatologist, CWS, Bangalore",
      img: img6,
    },
    {
      title:
        "Use this Space to Publicise Wildlife and Conservation Events in your City!",
      img: img7,
    },
    {
      title:
        "Foundation Training Program on the Practice of Ecological Restoration ",
      img: img8,
    },
    {
      title:
        "Bangalore Lake Census Workshop — Venkatappa Art Gallery, Bengaluru",
      img: img9,
    },
    {
      title: "Goa Bird Festival — Valpoi, Goa",
      img: img10,
    },
    {
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      img: img11,
    },
    {
      title:
        "Talk by Dr. Ajit Kumar, India’s Leading Primatologist, CWS, Bangalore",
      img: img12,
    },
  ]);

  return (
    <Fragment>
      <div className={styles.landscape_wrapper}>
        <ListingComponent
          data={landscapeListingData}
          pageName="landscape"
          pageTitle="Landscape"
          title={true}
        />
        <div className={styles.askus_container}>
          <CiHomeAskUs />
        </div>
      </div>
    </Fragment>
  );
};

export default Landscape;
