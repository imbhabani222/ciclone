import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
// import messages from "../../constants/messages";
import facebook from "../../public/assets/images/facebook.svg";
import linkdin from "../../public/assets/images/linkdin.svg";
import twitter from "../../public/assets/images/twitter.svg";
import logo from "../../public/assets/images/logo.svg";
import { Typography } from "antd";
const { Paragraph } = Typography;
// const { RESEVE_RIGHTS } = messages;
const footer_icon = [
  {
    id: "1",
    image: facebook,
    alt: "facebook",
    clickPath: "https://www.facebook.com/conservationindia",
  },
  {
    id: "2",
    image: linkdin,
    alt: "linkdin",
    clickPath: "https://www.linkedin.com/company/conservation-india",
  },

  {
    id: "3",
    image: twitter,
    alt: "twitter",
    clickPath: "https://twitter.com/conserve_ind",
  },
];
const footer_data = [
  {
    id: "1",
    name: "About CI",
    link: "/aboutCi",
    className: "about",
  },
  {
    id: "2",
    name: "Note to Contributors",
    link: "/note",
    className: "note",
  },
  {
    id: "3",
    name: "Authors",
    link: "/authors",
    className: "author",
  },
  {
    id: "4",
    name: "Posting Guidelines",
    link: "/posting",
    className: "guideline",
  },
  {
    id: "5",
    name: "Terms of Use ",
    link: "/terms",
    className: "termsofuse",
  },
  {
    id: "6",
    name: "Disclaimer",
    link: "/disclaimer",
    className: "disclaimer",
  },
  {
    id: "7",
    name: " Contact",
    link: "/contact",
    className: "contact",
  }
];
const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className={styles.footer_wrapper_parent}>
      <div className={styles.footer_wrapper_child1}>
        <div className={styles.footer_logo}>
          <Image
            // placeholder="blur"
            {...logo}
            alt="CI_Logo"
            width="166"
            height="46"
          />
        </div>

        <ul className={styles.footer_links}>
          {footer_data.map((elem) => (
            <Link
              key={elem.id}
              href={elem.link}
              className={styles[elem.className]}
            >
              <li className={styles.link_item}>{elem.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.footer_wrapper_child2}>
        <Paragraph className={styles.footer_text}>
          &copy; {`${year} Conservation India`}
        </Paragraph>
        <div className={styles.footer_img}>
          {footer_icon.map((ele) => (
            <a key={ele.id} href={ele.clickPath}>
              <Image
                // placeholder="blur"
                {...ele.image}
                alt={ele.name}
                width="75"
                height="50"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
