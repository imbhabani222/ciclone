import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styles from "./campaign.module.css";
import { Col, Pagination, Row, Select, Spin } from "antd";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import ListingComponent from "../../components/listingComponent";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import Loader from "../../components/Loader";
import axios from "axios";

export async function getServerSideProps(context) {
  const res = await fetch(
    " http://localhost:3000/api/getPosts?post_type=campaigns&limit=10&has_image=true"
  );

  const data = await res.json();
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

const Campaign = (props) => {
  console.log("[[[", props);
  const router = useRouter();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [campaignData, setCampaigncData] = useState([]);
  const [campaign, setCampaign] = useState([]);
  useEffect(() => {
    setCampaign(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image {...LeftArrow} alt="Privious" height={48} width={48} />
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

  const campaignApiCall = () => {
    setCampaign(true);
    axios
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=campaigns&limit=10`
      )
      .then((res) => {
        // console.log("res+++++", res);
        setCampaigncData(res?.data?.data);
        setCampaign(false);
        setVisible(false);
      })
      .catch((err) => {
        setCampaign(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  const postsPerPage = 9;
  const [number, setNumber] = useState(1);
  let newData = campaignData?.slice(
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

  useEffect(() => {
    campaignApiCall();
    setVisible(true);
  }, []);

  if (campaign) {
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
    <Fragment>
      <div className={styles.campaign_wrapper_container}>
        <div
          className={styles.campaign_wrapper}
          // style={{ width: "85%", margin: "0 auto 20px auto" }}
        >
          <div className={styles.page_title}>Campaign</div>
          <div className={styles.page_title_under_line}></div>
          {/* <div className={styles.top_row}> */}
          {/* <div className={styles.sub_heading}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour.
            </div> */}
          {/* <div className={styles.sort_wrapper}> */}
          {/* <div className={styles.sort_by_head}>SORT BY</div>
             
              <Select
                style={{ width: "320px" }}
                className="post_new"
                placeholder="Relevance"
              >
                <Select.Option value="-1">Relevance</Select.Option>
                <Select.Option class="level-0" value="29">
                  Last 7 days
                </Select.Option>
                <Select.Option class="level-0" value="26">
                  Last 30 days
                </Select.Option>
                <Select.Option class="level-0" value="26">
                  Last year
                </Select.Option>
              </Select> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        <ListingComponent
          data={newData}
          pageName="campaign"
          // pageTitle="Campaigns"
          title={true}
        />
        <div className={styles.pagination_div}>
          <Pagination
            itemRender={itemRender}
            className={styles.pagination}
            defaultCurrent={1}
            pageSize={postsPerPage}
            total={campaignData?.length}
            onChange={handlePage}
            showTitle={false}
            onShowSizeChange={false}
          />
        </div>

        {/* <div className={styles.askus_container}>
          <CiHomeAskUs />
        </div> */}
      </div>
    </Fragment>
  );
};

export default Campaign;
