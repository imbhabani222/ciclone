import React, { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge, Button, Input } from "antd";
import styles from "./Header.module.css";
import logo from "../../public/assets/images/logo.svg";
import search from "../../public/assets/images/search.svg";
import notification from "../../public/assets/images/notification.svg";
import CreateIcon from "../../public/assets/images/topicDetailsImages/createicon.svg";
import DownArrow from "../../public/assets/images/topicDetailsImages/down-arrows.svg";
import user from "../../public/assets/images/user.svg";
import menu from "../../public/assets/images/menu.svg";
import closemenu from "../../public/assets/images/close.svg";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import getWindowDimensions from "../Constants/getWidth";
import axios from "axios";
const nav_data = [
  {
    id: "1",
    name: "Home",
    link: "/",
    className: "home",
  },
  {
    id: "2",
    name: "Topics",
    link: "/topics",
    detailspage: ["/topic-details"],
    className: "topic",
  },
  {
    id: "3",
    name: "Articles",
    link: "/articles",
    detailspage: ["/articles-details"],
    className: "article",
  },
  {
    id: "4",
    name: "Campaigns",
    link: "/campaign",
    detailspage: ["/campaign-details"],
    className: "campaign",
  },
  {
    id: "5",
    name: "Gallery",
    link: "/gallery",
    detailspage: ["/gallery-details", "/featured-details"],
    className: "gallery",
  },
  // {
  //   id: "6",
  //   name: "Event",
  //   link: "/event",
  //   className: "event",
  // },
  {
    id: "6",
    name: "Essentials and Tips",
    link: "/essentials",
    detailspage: ["/essentials-details"],
    className: "essentials",
  },
];
const header_icon = [
  {
    id: "1",
    image: search,
    alt: "search",
    count: 5,
    link: "/search",
    className: "search",
  },
];

const Header = () => {
  const router = useRouter();
  console.log(router.asPath);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setIsMobile(true);
  };

  const handleOk = () => {
    setIsMobile(false);
  };

  const handleCancel = () => {
    setIsMobile(false);
  };

  const [windowSize, setWindowSize] = useState(getWindowDimensions());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowDimensions());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect(() => {
  //   const checkIfClickedOutside = e => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (isMobile ? ref.current : ref.current.contains(e.target)) {
  //       setIsMobile(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", checkIfClickedOutside)

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [isMobile])
  const [searchText, setSearchText] = useState("");

  console.log("routers", router);

  return (
    <Fragment>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <div className={styles.logo}>
            <Link href="/">
              <Image {...logo} alt="CI Logo" />
            </Link>
          </div>
          {isMobile ? (
            <Modal
              visible={isMobile}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              className={`${
                isMobile ? styles.nav_links_mobile : styles.nav_links
              }`}
              // onClick={() => setIsMobile(false)}
              // onClick={() => setIsMobile((oldState) => !oldState)}
            >
              {nav_data.map((elem, index) => (
                <Link
                  key={elem.id}
                  to={elem.link}
                  className={styles[elem.className]}
                  href={elem.link}
                  style={{ border: "3px solid red" }}
                >
                  <li
                    className={
                      elem.link === router.asPath
                        ? styles.active_link_item
                        : styles.link_item
                    }
                    onClick={() => setIsMobile((oldState) => !oldState)}
                  >
                    {elem.name}
                  </li>
                </Link>
              ))}
            </Modal>
          ) : (
            <ul
              className={`${
                isMobile ? styles.nav_links_mobile : styles.nav_links
              }`}
              onClick={() => setIsMobile(false)}
            >
              {nav_data.map((elem, index) => (
                <Link
                  key={elem.id}
                  to={elem.link}
                  className={styles[elem.className]}
                  href={elem.link}
                >
                  <li
                    className={
                      elem.link === router.asPath ||
                      elem?.detailspage
                        ?.toString()
                        ?.includes(
                          router.asPath.split("/")?.[1] !== ""
                            ? router.asPath.split("/")?.[1]
                            : false
                        )
                        ? styles.active_link_item
                        : styles.link_item
                    }
                  >
                    {elem.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}

          <div
            className={`${
              isMobile ? styles.nav_icons_mobile : styles.nav_link
            }`}
            // onClick={() => setIsMobile(false)}
            // onClick={() => setIsMobile((oldState) => !oldState)}
          >
            {header_icon.map((ele) => (
              <div
                key={ele.id}
                to={ele.link}
                className={styles[ele.className]}
                onClick={() => router.push("/search")}
                style={{ cursor: "pointer" }}
              >
                <Badge>
                  <Image {...ele.image} alt={ele.alt} width="50" height="38" />
                </Badge>
              </div>
            ))}
          </div>
          <div
            className={styles.mobile_menu_icon}
            // onClick={() => setIsMobile(false)}
            onClick={() => setIsMobile((oldState) => !oldState)}
          >
            {isMobile ? (
              <Image src={closemenu} alt="closemenu" width="50" height="38" />
            ) : (
              <Image src={menu} alt="menu" width="50" height="38" />
            )}
          </div>
        </div>
      </nav>

      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={490}
        height={800}
        className="signin-wrapper"
        footer={null}
      >
        {/* <Signin /> */}
      </Modal>
    </Fragment>
  );
};

export default Header;
