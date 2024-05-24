import React from "react";
import { Col, Row, Spin } from "antd";
import styles from "./index.module.css";

function AboutCi() {
    return (

        <div className={styles.container}>
            <div className={styles.first_card}>
                <div className={styles.about_head}>
                    Conservation India
                </div>
                <p className={styles.para_about}>
                    <br />
                    CI is an entirely volunteer-driven, non-profit, non-sponsored portal that aims to facilitate nature conservation by providing reliable information as well as the practical knowledge needed to act effectively.
                    <br /><br />

                    We define conservation as knowledge-driven actions that lead to the effective management and recovery of wildlife. That means giving priority to meeting the ecological needs of wildlife populations in decline and to the recovery and expansion of their habitats.
                    <br /> <br />

                    CI is committed to promoting conservation strategies that are rooted in evidence.
                    <br /><br />
                    With wildlife and wildlands now reeling under unsustainable demands from all sectors – urban and rural, industrial and agricultural – there is little time left. Therefore, CI aspires to be a springboard for rational and practical conservation action, rather than a platform for theoretical debate.
                    <br /> <br />
                    Come join us, act now.
                </p>
            </div>
            <div className={styles.second_card}>
                <p className={styles.para_about}>
                    <b>Note to Users</b>
                    <br /><br />
                    Thank you for visiting CI.
                    <br /><br />
                    This portal will always remain a work in progress, and we would be grateful if readers could point out any errors or inaccuracies (please site the page URL).  Our goal is to make CI as comprehensive as possible. So if there’s anything else you would like to see on the site, please let us know and we’ll do our best to include it. Feel free to contact us at: info at conservationindia.org.
                    <br /><br />
                    Thanks!
                    <br />
                    CI Team
                </p>
            </div>
        </div>
    );
}
export default AboutCi;