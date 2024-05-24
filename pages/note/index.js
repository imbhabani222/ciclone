import React from "react";
import { Col, Row, Spin } from "antd";
import styles from "./index.module.css";

function NoteToContributor() {
    return (

        <div className={styles.container}>
            <div className={styles.note_card}>
                <div className={styles.note_head}>
                    Note to contributors
                </div>
                <p className={styles.para_note}>
                    <br />
                    Conservation India (CI) is a platform for mass collaboration, and your partnership will make this portal comprehensive. There are many ways in which you can contribute:
                </p>
                <ol className={styles.para_note}
                    style={{ paddingLeft: "1rem" }}>
                    <li>
                        If you are a practising conservationist, expert, or conservation biologist, and wish to share your knowledge and experience with others, we welcome your contributions in the form of essays, opinions or tutorials from your domain or region of expertise. Please write to us with your ideas at the email address provided below. We also invite conservation-related photographs, which can be directly uploaded into our gallery by users of the portal.
                    </li>
                    <br />
                    <li>
                        If you are a novice, amateur naturalist or nature photographer, please send us any interesting conservation images, as well as conservation news from your region, including events and happenings.
                    </li>
                    <br />
                    <li>
                        <b>Terms of Contributions</b>— all Contributions to www.conservationindia.org shall be as per the following terms:

                        <ol>
                            <br />
                            <li>The Contributor is willingly providing the content to Conservation India to be published on the website www.conservationindia.org
                            </li>
                            <br />
                            <li>
                                The Contribution provided does not violate the intellectual  property rights of any individual or organization. CI shall not be responsible for any intellectual property rights violations of any kind to any third party.

                            </li>
                            <br />
                            <li>
                                The Contribution of the Contributor shall be published on the www.conservationindia.org website at the discretion of the CI team.

                            </li>
                            <br />
                            <li>
                                The time period for which the Contributor’s contribution will remain published or cease to be published on the CI website shall be determined solely by the CI team.

                            </li>
                            <br />
                            <li>
                                If you have conservation-related questions and need authoritative answers, upload your queries in our ‘Ask CI’ section and we will get the right expert to respond.

                            </li>
                            <br />
                            <li>
                                You can use our social media section in the Community page to spread CI’s messages through Twitter or Facebook.

                            </li>
                        </ol>
                    </li>
                    <br />
                </ol>
                <div className={styles.para_note}>
                    You can directly email any material to (info conservationindia.org). Please name the subject of the email appropriately and stick to posting guidelines if you are uploading images.
                    <br /> <br />
                    We look forward to your contributions.
                    <br /> <br />
                    Thanks!
                    <br />
                    CI Team
                    <br />  <br />
                    Shekar Dattatri <br />
                    Ramki Sreenivasan
                </div>
            </div>
        </div>
    );
}
export default NoteToContributor;