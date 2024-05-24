import { Button, Col, Row, Select } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./index.module.css";
import AuthorImg from "../../public/assets/images/protectedAreaDetails/author-img.svg";
import FaceBookImg from "../../public/assets/images/socialIcons/facebook-icon@2x.svg";
import LinkedInImg from "../../public/assets/images/socialIcons/linkedin-icon@2x.svg";
import TwitterImg from "../../public/assets/images/socialIcons/twitter@2x.svg";
import UserImg from "../../public/assets/images/articleDetailsImgs/user-img.svg";
import CiHomeAskUs from "../../components/CiHomeAskUs";
import CiHomeSubscribe from "../../components/CiHomeSubscribe";
import { ArrowRightOutlined } from "@ant-design/icons";

function ProtectedAreaDetails() {
  const [trendingTags, setTrensdingTags] = useState([
    "Arunachal Pradesh",
    "Community Conservation",
    "Dibang Valley",
    "Conservation campaigns",
    "Forest Advisory Committee (FAC)",
  ]);

  const [tipsAndMore, setTipsAndMore] = useState([
    "Trial of Hunting cases",
    "Charge Sheet vs. Complaint",
    "Get an Official copy of PA Notification",
    "Use satellite imagery to check encroachments",
    "Diff between a Govt. Dept. and Govt.",
    "Hunting / smuggling cases",
    "RTI to seek management plans",
  ]);
  return (
    <div className={styles.protectedarea_container}>
      <Row justify="space-between" className={styles.top_container}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={styles.top_container_first_col}
        >
          <div className={styles.top_container_first_col_heading}>
            Indias Conservation Challenges
          </div>
          <div className={styles.top_container_first_col_line}></div>
          <div className={styles.top_container_first_col_name}>
            Visionary conservationist - Ullas Karanth
          </div>
          <div className={styles.top_container_first_col_text}>
            I think there is still reason for hope
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={styles.top_container_second_col}
        >
          <Image alt="Author" {...AuthorImg} />
        </Col>
      </Row>
      <Row justify="space-between" className={styles.second_row}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          className={styles.second_row_first_col}
        >
          <Image alt="LinkedInImg" {...LinkedInImg} />
          <Image alt="FaceBookImg" {...FaceBookImg} />
          <Image alt="TwitterImg" {...TwitterImg} />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className={styles.second_row_second_col}
        >
          <div className={styles.first_heading}>
            Wildlife conservation at crossroads
          </div>
          <div className={styles.second_heading}>
            An interview with Dr. K. Ullas Karanth
          </div>
          <div className={styles.first_para}>
            Dr Ullas Karanth, a Senior Scientist with the international NGO,
            Wildlife Conservation Society (WCS), is a world-renowned wildlife
            biologist. In a wide-ranging interview with wildlife and
            conservation filmmaker, Shekar Dattatri, he outlines the basic
            problems that beset wildlife conservation in Indias human dominated
            landscape, and shares his views on preserving these last wild
            places.
          </div>
          <div className={styles.second_para}>
            (This is an updated version of an interview that was first published
            under the title Not much time left in the Deccan Herald in February
            2002).
          </div>
          <div className={styles.second_heading2}>
            Indias rich wildlife heritage is facing several threats. Just how
            serious is the problem?
          </div>
          <div className={styles.third_para}>
            India is renowned as the land of the tiger and the elephant; many of
            our gods are depicted riding peacocks or tigers. But sadly, the
            equation that existed between people and wildlife centuries ago has
            vanished, and our Protected areas, which comprise a mere 4% of
            Indias landscape, are now mere islands amidst a sea of people, with
            tremendous demands and pressures being put on them.
            <br /> <br /> The most serious problem that I see today is the
            neglect and collapse of basic wildlife protection capacity during
            the last decade. This “mission-drift” has resulted from several
            causes: lack of political will, deterioration in the quality of
            forest administration, and the influence of international
            conservation paradigms that blindly promote “sustainable use” as a
            solution, while failing to recognize the overexploited status of the
            forest resources targeted for such use.
          </div>
          <div className={styles.third_heading}>
            What, in your opinion, are the most urgent threats to wildlife?
          </div>
          <div className={styles.fourth_para}>
            By far the most urgent threat is the pressure from illegal hunting
            or poaching. We still have substantial amounts of forests left in
            some areas, particularly in the huge swathes of the tribal belts of
            Central and North East India, but they are “empty forests”. The
            wildlife in them has mostly been killed off, eaten or sold. The
            killers come in a variety of forms: they may be local people hunting
            for the pot, using snares or guns, or they may be the lowest link in
            a mafia that is involved in the massive international illegal trade
            in wildlife that is today almost as big as the drug trade.
            <br /> <br />
            In addition, during the past decade, reckless development in the
            form of new highways, mines, dams and even so-called ecotourism have
            emerged as major indirect threats to wildlife habitats both inside
            nature reserves, as well as outside them. There are powerful lobbies
            pushing these projects..
          </div>
          <div className={styles.fourth_heading}>
            As a biologist, can you tell us about the impact of poaching?
          </div>
          <div className={styles.fifth_para}>
            The most severe impact of poaching is that it depresses wildlife
            populations. Many species get hunted down to levels below which
            their populations are not viable. Poaching also has secondary
            impacts. If herbivores such as deer, gaur, and wild pig are killed
            without respite, a tigress, which needs to make about 50 or 60 kills
            a year to survive, wont be able to raise her cubs. The third thing
            is, when we take species out of a wildlife community, we are not
            even sure what the ultimate impact will be. You may be taking out a
            species of civet or a species of bird that is crucial for
            pollinating a tree or dispersing its seeds. So, rampant poaching is
            dismantling, at random, a very intricate piece of machinery that
            nature has built over millions of years, the consequences of which
            we do not even fully comprehend today.
          </div>
          <div className={styles.fifth_heading}>
            Whats the modus operandi of poachers in our forests?
          </div>
          <div className={styles.sixth_para}>
            There is a common misconception that a poacher is always someone who
            shoots animals with a gun. In actual fact, poaching takes place in
            very many different ways. Poachers are often harmless and humble
            looking local people operating quietly in the forest. A very common
            technique is to set snares on trails used by animals… these are
            simple snares made of telephone wire or motorcycle clutch cables,
            which can kill a deer or even a tiger. Deadfall traps are set, jaw
            traps are set…..some of these are extremely cruel. But one thing is
            common to all these forms of silent poaching they are very hard to
            detect. You can hear a gun shot, and try to corner the poacher; but
            a silently set snare, a poisoned carcass or a deadfall trap is a
            different matter. You may not even know such poaching is going on,
            but its going on all over the country in our forests on a massive
            scale.
          </div>
          <div className={styles.comment_heading}>Comments</div>
          <div className={styles.comments_sort_by}>
            <div className={styles.number_of_comments}>2 comments</div>
            {/* <Select placeholder="Sort by">
              {[1, 2, 3].map((fr, index) => {
                return (
                  <Select.Option key={index} value={fr}>
                    {fr}
                  </Select.Option>
                );
              })}
            </Select> */}
          </div>

          <div className={styles.commented_member_details}>
            <div>
              <Image
                alt="UserImg"
                {...UserImg}
                className={styles.commented_user_img}
              />
            </div>
            <div className={styles.user_name_comment}>
              <div className={styles.commented_user_name}>Divya Khosla</div>
              <div className={styles.commented_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </div>
            </div>
          </div>

          <div className={styles.border_bottom_gray}></div>
          <div className={styles.trending_tags}>
            {trendingTags.map((item, index) => {
              return <Button key={index}>{item}</Button>;
            })}
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          className={styles.second_row_third_col}
        >
          <div className={styles.tips_more_title}>Tips and More</div>
          <div className={styles.tips_more_sub_title}>
            New to Conservation India? Here is a curated list of tips and
            educational reading material.
          </div>
          <div>
            {tipsAndMore.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    styles.ci_home_essentials_right_section_tips_more_container
                  }
                >
                  <div
                    className={
                      styles.ci_home_essentials_right_section_tips_more
                    }
                  >
                    {item}
                  </div>
                  <div
                    className={
                      styles.ci_home_essentials_right_section_arrow_icon
                    }
                  >
                    <ArrowRightOutlined />
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <div>
        <CiHomeAskUs />
      </div>
      <CiHomeSubscribe />
    </div>
  );
}

export default ProtectedAreaDetails;
