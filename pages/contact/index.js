import React from "react";
import styles from "./index.module.css";

function Contact() {
    return (

        <div className={styles.container}>
            <div className={styles.contact_card}>
                <div className={styles.contact_head}>
                    Contact Us
                </div>
                <p className={styles.para_contact}>
                    <br />
                    We would love to hear from you!
                    <br />   <br />
                    If you are experiencing any problems with the site, encounter any typographical / factual errors, or if you have any suggestions to improve the site, please drop us a note at info at conservationindia.org.
                    <br />   <br />
                    Thanks,
                    <br />
                    CI Team
                </p>
            </div>

        </div>
    );
}
export default Contact;