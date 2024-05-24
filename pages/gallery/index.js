import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Col, Pagination, Row, Select, Spin } from "antd";
import styles from "./gallery.module.css";
import LeftArrow from "../../public/assets/images/essentiallistImgs/leftarrow.svg";
import RightArrow from "../../public/assets/images/essentiallistImgs/rightarrow.svg";
import sliderImg from "../../public/assets/images/slider.svg";
import ReletedComponentSlider from "../../components/relatedComponent";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import ListingComponent from "../../components/listingComponent";
import Loader from "../../components/Loader";
import axios from "axios";

export async function getServerSideProps(context) {
  const res = await fetch(
    " http://localhost:3000/api/getPosts?post_type=gallery&limit=10"
  );
  const data = await res.json();
  const featuredRes = await fetch(
    "http://localhost:3000/api/search?post_type=gallery&tags=photo-feature&limit=10"
  );
  const featuredData = await featuredRes.json();
  const videoRes = await fetch(
    " http://localhost:3000/api/getPosts?post_type=video&limit=10"
  );
  const videoData = await videoRes.json();
  return {
    props: {
      data: data,
      featuredData: featuredData,
      videoData: videoData,
    }, // will be passed to the page component as props
  };
}

const GalleryList = (props) => {
  const dispatch = useDispatch();
  // const imagesFetchData1 = useSelector(
  //   (state) => state?.data?.allimages?.result?.data || []
  // );

  const featuredImageData1 = useSelector(
    (state) => state?.data?.featured?.result?.data || []
  );
  const [imagesFetchData, setImagesFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(props?.data?.data);
    // dispatch({ type: "FETCH_TOPICS" });
  }, [props]);
  const [visible, setVisible] = useState(true);
  const [featuredImageData, setFeaturedImageData] = useState([]);
  const [videosFetchData, setvideosFetchData] = useState([]);

  // console.log("+++fetured baaa", featuredImageData);
  // console.log("+++gallery baaa", imagesFetchData);

  // const fetchImgDataLoader = useSelector(
  //   (state) => state?.data?.allimages || []
  // );
  const fetchVdoDataLoader = useSelector(
    (state) => state?.data?.allVideos || []
  );

  const videosFetchData1 = useSelector(
    (state) => state?.data?.allVideos?.result?.data || []
  );
  const postsPerPage = 13;
  const videoPerPage = 18;

  const [number, setNumber] = useState(1);
  const handlePage = (pageNumber) => {
    setNumber(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  let newData = imagesFetchData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  let newFeaturedImageData = featuredImageData?.slice(
    (number - 1) * postsPerPage,
    postsPerPage * number
  );
  let newVideoData = videosFetchData?.slice(
    (number - 1) * videoPerPage,
    videoPerPage * number
  );
  console.log(newVideoData);

  const relatedImagesApiCall = () => {
    setLoading(true);
    axios
      //localhost:3000/api/search?text=Indian
      .get(
        " https://ci-demo.hutechweb.com/api/getPosts?post_type=gallery&limit=10"
      )
      .then((res) => {
        console.log("res+++++", res);
        console.log("data--res---", res?.data?.data);
        setImagesFetchData(res?.data?.data);
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        // console.log("err+++", err);
      });
  };

  useEffect(() => {
    setLoader(true);
    relatedImagesApiCall();
    setFeaturedImageData(props?.featuredData?.data);
    setvideosFetchData(props?.videoData?.data);
    setVisible(true);
    setLoader(false);
  }, []);

  const [loader, setLoader] = useState(false);

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

  // const [sliderData, setSliderData] = useState([
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  //   {
  //     img: sliderImg,
  //     title: "Feral Dogs - Wildlife Conflicts",
  //     article_count: "13 Articles",
  //     img_count: "• 2 Images",
  //   },
  // ]);

  const [selectedTab, setSelectedTab] = useState("gallery");
  if (loading || fetchVdoDataLoader?.fetching || featuredImageData?.fetching) {
    return (
      <>
        <div
          style={{
            margin: "auto",
            justifyContent: "center",
            textAlign: "center",
            padding: "3rem",
            marginTop: "10rem",
            height: "80vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      </>
    );
  }

  return (
    <div className={styles.gallery_wrapper_container}>
      <div className={styles.container}>
        <div className={styles.page_title}>Gallery</div>
        <div className={styles.page_title_under_line}></div>

        <div className={styles.sub_container}>
          <div className={styles.button_div}>
            <button
              onClick={() => setSelectedTab("gallery")}
              className={
                selectedTab === "gallery"
                  ? styles.switch_tab
                  : styles.switch_tab_selected
              }
            >
              All Images
            </button>
            <button
              onClick={() => setSelectedTab("featured")}
              className={
                selectedTab === "featured"
                  ? styles.switch_tab
                  : styles.switch_tab_selected
              }
            >
              PhotoFeatures
            </button>
            <button
              onClick={() => setSelectedTab("video")}
              className={
                selectedTab === "video"
                  ? styles.switch_tab
                  : styles.switch_tab_selected
              }
            >
              Videos
            </button>
          </div>
          {/* <div>
            <div>
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
              </Select>
            </div>
          </div> */}
        </div>
      </div>
      {selectedTab === "gallery" ? (
        <div>
          <ListingComponent data={newData} pageName="gallery" title={false} />
          <div className={styles.pagination_div}>
            <Pagination
              itemRender={itemRender}
              className={styles.pagination}
              defaultCurrent={1}
              pageSize={postsPerPage}
              total={newData?.length}
              onChange={handlePage}
              showTitle={false}
              onShowSizeChange={false}
            />
          </div>
        </div>
      ) : selectedTab === "featured" ? (
        <div>
          <ListingComponent
            data={newFeaturedImageData}
            pageName="featured"
            title={false}
          />
          <div className={styles.pagination_div}>
            <Pagination
              className={styles.pagination}
              itemRender={itemRender}
              showTitle={false}
              defaultCurrent={1}
              pageSize={postsPerPage}
              onChange={handlePage}
              total={featuredImageData?.length}
              onShowSizeChange={false}
            />
          </div>
        </div>
      ) : selectedTab === "video" ? (
        <div>
          <ListingComponent
            data={newVideoData}
            pageName="video"
            title={false}
          />
          <div className={styles.pagination_div}>
            <Pagination
              itemRender={itemRender}
              className={styles.pagination}
              defaultCurrent={1}
              pageSize={videoPerPage}
              total={videosFetchData?.length}
              onChange={handlePage}
              showTitle={false}
              onShowSizeChange={false}
            />
          </div>
        </div>
      ) : null}

      {/* {selectedTab === "video" && (
        <>
          <div className={styles.related_container}>
            <div className={styles.related_container_heading}>
              Related Topics
            </div>
            <div className={styles.page_title_under_line}></div>
            <div className={styles.related_container_subheading}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour.
            </div>
          </div>
          <div className={styles.related_slider_comp}>
            <ReletedComponentSlider data={sliderData} pageName="articlelist" />
          </div>
        </>
      )} */}
      {selectedTab === "video" && (
        <div className={styles.askus_container}>{/* <CiHomeAskUs /> */}</div>
      )}
    </div>
  );
};

export default GalleryList;
