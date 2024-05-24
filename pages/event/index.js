import React, { Fragment, useState } from "react";
import styles from "./eventListing.module.css";
import Image from "next/image";

import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import img1 from "../../public/assets/images/eventListingImgs/event-img1.svg";
import img2 from "../../public/assets/images/eventListingImgs/event-img2.svg";
import img3 from "../../public/assets/images/eventListingImgs/event-img3.svg";
import img4 from "../../public/assets/images/eventListingImgs/event-img4.svg";
import img5 from "../../public/assets/images/eventListingImgs/event-img5.svg";
import img6 from "../../public/assets/images/eventListingImgs/event-img6.svg";
import img7 from "../../public/assets/images/eventListingImgs/event-img7.svg";
import img8 from "../../public/assets/images/eventListingImgs/event-img8.svg";
import img9 from "../../public/assets/images/eventListingImgs/event-img9.svg";
import img10 from "../../public/assets/images/eventListingImgs/event-img10.svg";
import img11 from "../../public/assets/images/eventListingImgs/event-img11.svg";
import img12 from "../../public/assets/images/eventListingImgs/event-img12.svg";
import img13 from "../../public/assets/images/eventListingImgs/event-img13.svg";
import img14 from "../../public/assets/images/eventListingImgs/event-img14.svg";
import img15 from "../../public/assets/images/eventListingImgs/event-img15.svg";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import ListingComponent from "../../components/listingComponent";
import { Pagination } from 'antd';

const Event = () => {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...LeftArrow} alt="Privious" />
        </a>
      );
    }

    if (type === "next") {
      return (
        <a>
          <Image {...RightArrow} alt="Next" />
        </a>
      );
    }

    return originalElement;
  };

  const [eventListingData, setEventListingData] = useState([
    {
      img: img1,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img2,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img3,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img4,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img5,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img6,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img7,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img8,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img9,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img10,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img11,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
    {
      img: img12,
      title: "Chemical Ecology and the Anthropocene — CWS, Bengaluru",
      time: "July 15 2022  |  7:00 PM - 9:00 PM",
      price: "₹5000 onwards",
    },
  ]);

  return (
    <Fragment>
      <div className={styles.event_wrapper}>
        <ListingComponent
          data={eventListingData}
          pageName="event"
          pageTitle="Events"
          title={true}
        />
         <div className={styles.pagination_div}>
          <Pagination  className={styles.pagination}
              itemRender={itemRender} showTitle={false} defaultCurrent={1} total={50} />
        </div>
        <div className={styles.askus_container}>
          <CiHomeAskUs />
        </div>
      </div>
    </Fragment>
  );
};

export default Event;
