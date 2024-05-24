import React from "react";
import { Col, Row, Spin } from "antd";
import styles from "./index.module.css";

function Disclaimer() {
    return (

        <div className={styles.container}>
            <div className={styles.disclaimer_card}>
                <div className={styles.disclaimer_head}>
                    Disclaimer
                </div>
                <p className={styles.para_disclaimer}>
                    <br />
                    Conservation India reserves the right to publish or reject submissions without assigning reasons. All submissions must be accompanied by the author’s real name in full, address, designation, institutional affiliation – if any – and mobile number. We do not entertain, publish or respond to anonymous, pseudonymous or unverified submissions. While CI tries to ensure the accuracy of the information presented on its portal, we do not take responsibility for any inaccuracies or errors. The views expressed in articles are those of their authors, and may not necessarily reflect the views of CI or its editorial team.The information in this portal is only meant as a guide, and readers are advised to cross check all facts. While links to external sources are sometimes provided, we do not take any responsibility for the content on those sites. The inclusion of external links does not constitute an endorsement by CI.
                </p>
            </div>

        </div>
    );
}
export default Disclaimer;