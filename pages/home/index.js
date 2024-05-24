import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import CiHomeFeatured from "../../components/CiHomeFeatured";
import CiHomeTopics from "../../components/CiHomeTopics";
import CiHomeExternalLinks from "../../components/CiHomeExternalLink";
import CiHomeLatestArticles from "../../components/CiHomeLatestArticles";
import CiHomeCampaigns from "../../components/CiHomeCampaigns";
import CiHomeSpotLight from "../../components/CiHomeSpotLight";
import CiHomeEssentials from "../../components/CiHomeEssentials";
import CiHomeConnect from "../../components/CiHomeConnect";
import CiHomeSubscribe from "../../components/CiHomeSubscribe";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import axios from "axios";
import Loader from "../../components/Loader";

export async function getServerSideProps(context) {
  const authorRes = await fetch(
    " http://localhost:3000/api/getPopularUser?limit=10"
  );
  const authorData = await authorRes.json();
  return {
    props: {
      authorData,
    }, // will be passed to the page component as props
  };
}

const Home = (props) => {
  console.log("kkkkkkkkkkkk", props);
  const dispatch = useDispatch();
  let article = useSelector((state) => state?.data?.listData || []);
  const tagData = useSelector((state) => state?.data?.tagsData?.result || []);
  let sortArticle = article?.result?.data?.sort((first, second) => {
    if (first.post_id - second.post_id) return -1;
  });
  const publishedArticle = sortArticle?.filter(
    (elem) => elem?.post_status == "publish"
  );

  let topics = useSelector((state) => state?.data?.listTopics || []);
  let sortTopics = topics?.result?.data?.sort((first, second) => {
    if (first.post_id - second.post_id) return -1;
  });
  const publishedTopics = sortTopics?.filter(
    (elem) => elem.post_status == "publish"
  ); // need to take post status
  console.log(publishedTopics);
  useEffect(() => {
    dispatch({ type: "FETCH_DATA" });
    dispatch({ type: "FETCH_TAGS" });
    dispatch({ type: "FETCH_TOPICS" });
  }, [dispatch]);

  let articleFetching = useSelector((state) => state?.data?.listData || []);
  const campFetching = useSelector(
    (state) => state?.data?.campaignFetchData || []
  );
  const imagesFetching = useSelector((state) => state?.data?.allimages || []);

  let firstArticle = useSelector(
    (state) => state?.data?.listData?.result?.data || []
  );

  const firstCampaign = useSelector(
    (state) => state?.data?.campaignFetchData.result?.data || []
  );

  const imagesFetchData = useSelector(
    (state) => state?.data?.allimages?.result?.data || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_DATA" });
    dispatch({ type: "FETCH_CAMPAIGN" });
    dispatch({ type: "FETCH_All_IMAGES" });
  }, [dispatch]);

  const [essentialListingDatas, setEssentialListingDatas] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [loader, setLoader] = useState(false);
  const externalLinkApiCall = () => {
    // setLinkLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        ` https://ci-demo.hutechweb.com/api/getPosts?post_type=external-links&limit=30`
      )
      .then((res) => {
        console.log("res+++++", res);
        setLinkData(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);

        // console.log("err+++", err);
      });
  };
  useEffect(() => {
    setLoader(true);
    externalLinkApiCall();
    let url =
      " https://ci-demo.hutechweb.com/api/getPosts?post_type=essentials&limit=10";
    axios
      .get(url)
      .then((res) => {
        setEssentialListingDatas(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  if (
    loader ||
    articleFetching?.fetching ||
    campFetching?.fetching ||
    imagesFetching?.fetching
  ) {
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
  console.log(publishedTopics, "tooooooo");
  return (
    <div className={styles.home_wrapper}>
      <CiHomeFeatured
        firstArticle={firstArticle}
        firstCampaign={firstCampaign}
        imagesFetchData={imagesFetchData}
      />
      <CiHomeTopics topics={publishedTopics} />
      <CiHomeExternalLinks data={linkData} />
      <CiHomeLatestArticles article={publishedArticle} tag={tagData} />
      <CiHomeCampaigns firstCampaign={firstCampaign} />
      {/* <CiHomeSpotLight imagesFetchData={firstArticle} /> */}
      <CiHomeEssentials data={essentialListingDatas} />
      {/* <CiHomeConnect /> */}
      {/* <CiHomeAskUs /> */}
      <CiHomeSubscribe />
    </div>
  );
};

export default Home;
