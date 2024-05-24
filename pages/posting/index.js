import React from "react";
import styles from "./index.module.css";

function Posting() {
    return (

        <div className={styles.container}>
            <div className={styles.posting_card}>
                <div className={styles.posting_head}>
                    CI Image Posting Guidelines
                </div>
                <p className={styles.para_posting}>
                    <br />
                    <ol className={styles.para_note}
                        style={{ paddingLeft: "1rem" }}>
                        <li>
                            Users (even without registering) can email images to (info conservationindia org). Please name the subject of the email appropriately.
                        </li>
                        <br />
                        <li>
                            If you are a novice, amateur naturalist or nature photographer, please send us any interesting conservation images, as well as conservation news from your region, including events and happenings.
                        </li>
                        <br />
                        <li>The moderators of CI reserve the right to accept or reject the submitted image without providing any justification.
                        </li>
                        <br />
                        <li>
                            The person posting or emailing the image must hold the copyrights to the image. As an exception, if you are posting an image on CI for which you do not hold the copyright, but deem it of some value to CI viewers, kindly ensure that you have the full written consent of the original photographer who holds the copyright for that image. Kindly mention this consent as a comment in your post. In case you are posting an image of a person on CI, kindly get the consent of that person before posting his image. Posting of any pirated material is strictly prohibited!
                        </li>
                        <br />
                        <li>
                            Images must be of wildlife or nature shot in India.

                        </li>
                        <br />
                        <li>Kindly avoid posting images of nesting birds unless the user sees specific conservation value.
                        </li>
                        <br />
                        <li>
                            We recommend that a descriptive title be used – whenever possible.
                        </li>
                        <br />
                        <li>
                            You cannot post more than THREE images in a day.
                        </li>
                        <br />
                        <li>
                            If the image has been digitally altered beyond simple adjustments to color, contrast and sharpening, etc., please state so in your post!
                        </li>
                        <br />
                        <li>
                            Suggested image size would be 1000 pixels on its longest side, including any borders or “frames” applied to the image.
                        </li>
                        <br />
                        <li>
                            Maximum file size for images hosted by CI is 300KB.
                        </li>
                        <br />
                        <li>
                            Please consider the merit of your image before posting it.
                        </li>
                        <br />
                        <li>
                            On the images you post please do not display anything other than your copyright mark. URL’s or names of commercial ventures and ADs strictly prohibited.
                        </li>
                        <br />
                        <li>
                            Please include the following information in your posts:
                            <ul>
                                <li>
                                    Tell us where the image was taken and when. Do not disclose the exact location where you shot the image. The broad area will do.
                                </li>
                                <br />
                                <li>
                                    Tell us what the image is about, what conservation issues it addresses, and what motivated you to make it.
                                </li>
                                <br />
                                <li>
                                    Equipment and camera settings (optional).
                                </li>
                                <br />
                            </ul>
                        </li>
                    </ol>
                    <br />
                    Thanks!
                    <br />
                    CI Team
                </p>
            </div>

        </div>
    );
}
export default Posting;