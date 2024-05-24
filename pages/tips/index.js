import {
  AlignCenterOutlined,
  ArrowRightOutlined,
  DownOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
const { Panel } = Collapse;

const Tips = () => {
  const [activeKey, setActiveKey] = useState("");
  const router = useRouter();
  const {
    query: { item, index },
  } = router;
  const props = { item, index };

  useEffect(() => {
    if (index === undefined) {
      let element = document.getElementById("1"); // Replace "1" with the actual ID of the element you want to scroll to
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollTo(0, 140); // Scrolls to the top of the page
        setActiveKey("1");
      }
    } else {
      let element = document.getElementById(index.toString());
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollTo(0, 140); // Scrolls to the top of the page
        setActiveKey(index.toString());
      }
    }
  }, []);

  const [tipsHeading, setTipsHeading] = useState([
    {
      header: "Trial of Hunting cases",
      text: "",
    },
    {
      header: "",
      text: "",
    },
    {
      header: "",
      text: "",
    },
    {
      header: "",
      text: "",
    },
    {
      header: "",
      text: "",
    },
    {
      header: "",
      text: "",
    },
    {
      header: "RTI to seek management plans",
      text: "Please apply under the RTI Act and get a copy of the Management Plan of the National Park/Sanctuary or the Tiger Conservation Plan of the Tiger Reserve which you are trying to protect under a site based conservation monitoring program. Also apply for a certified copy of the Annual Plan of Operations (APO) which will give you details of the approved activities/civil works with budgets. These documents will be very useful for monitoring and advocacy.",
    },
    {
      header: "Filing a petition",
      text: "Before filing a petition before the High Court or NGT please ensure that you first issue a notice/memorandum to the relevant or statutory authority seeking action. If that does not work, go ahead with the petition and enclose an acknowledged copy of the notice. This will insulate your petition from disposal/dismissal on this count since courts now verify if administrative remedies have been exhausted.",
    },
    {
      header: "RTI — Inspection of Public Works",
      text: "The RTI Act enables you to carry out an inspection of public works viz. Water hole, fire line, check dam, EPT, Solar fence etc. You can get these measured by a Chartered Engineer and even collect samples of the material for testing. You cannot be denied this right under the pretext that “it is in the core/critical tiger habitat” etc. Please see Section2 (j) (i) & (iii) and Section 3 of the RTI Act.",
    },
    {
      header: "File Inspection under RTI",
      text: "One can carry out an inspection of Government ‘Records’ (files) under the RTI Act. This will provide extremely useful information recorded in file notings, inspection reports, pending complaints and other documents. Use the same application form to seek inspection of records. Rule 4(f) specifies that the fee chargeable for inspection of files would be Rs 5/hour after the first hour, which is free. After inspection you can seek certified copies of documents.",
    },
    {
      header: "Difference between a Sanctuary and National Park",
      text: `There are three key differences: ${"\n"}1. During the notification process, the Collector in consultation with the Chief Wildlife Warden can allow the continuation of certain rights of people inside a Sanctuary but not in a National Park.2. The Chief Wildlife Warden can permit grazing of livestock only in a Sanctuary. 3. A Sanctuary can be upgraded as a National Park but not vice versa.`,
    },
    {
      header: "Section 55(c)",
      text: "The Wildlife (Protection) Act contains a provision that empowers activists to pursue violations that have not been acted upon by forest officers. A notice under Section 55(c) can be issued to the State Chief Wildlife Warden along with details and evidence (photos/ videos/reports). If no action is initiated within 60 days despite this, you can file a complaint before the Jurisdictional Magistrate, who can take cognizance and commence a criminal trial against the accused person(s).",
    },
    {
      header: "Meeting with Officials",
      text: "Here’s a less well known fact about dealing with the bureaucracy. Whenever you meet an official, either in his or her office or in the field, make a note of the time, date and place along with the subject discussed. Make it a point to accurately quote the discussion/assurance that you may have received, along with the meeting date, etc. in any letter or reminder that you send. This will ensure that the meeting/interaction gets documented in government records.",
    },
    {
      header: "Correspondence with Govt.",
      text: "Did you know that Govt. officials are not bound to respond to any letter when their name/designation is in the ‘Copy to’ or ‘CC to’ section? They will normally read and file the letter. Therefore whenever you are seeking action from multiple authorities, ensure that you address the letter to all of them (not copy to) in order of seniority. For example: To: 1. The Chief Wildlife Warden, XYZ State 2. The Field Director – XYZ Tiger Reserve. 3. The Deputy Director – XYZ Tiger Reserve…",
    },
    {
      header: "Filing RTIs",
      text: "When you file an RTI, always apply for a ‘Certified Copy’. Obtaining a Certified Copy will be very useful, particularly when you have to file it in court or need to release it to the media. The document will be perceived as authentic. So, the next time you approach the Public Information Officer (PIO) please make sure you mention ‘Certified Copy’ (instead of just “Copy”) of the letter/document etc. in column no. 3 of the RTI form. Click here for more details on RTI.",
    },
    {
      header: "Documenting Violations",
      text: "Whenever you observe a potential violation in the field, please collect as much evidence as possible. Take photos/videos – both wide angle and close ups. Find out the exact local name of the location, a GPS reading if possible, the name of the Range or Beat or Compartment and some prominent landmark (river/watch tower/waterhole…). Not only will your complaint be considered more seriously but the information will also help increase chances of detection, and aid investigation.",
    },
  ]);

  const onChange = (key) => {
    setActiveKey(key);
  };
  // console.log("props+++", props.item);

  return (
    <div className={styles.container}>
      <div className={styles.main_heading}>Tips</div>
      <div className={styles.red_line}></div>
      {/* {tipsHeading?.map((item, index) => {
        return (
          <Collapse
            destroyInactivePanel
            expandIcon={({ isActive }) =>
              isActive ? <DownOutlined /> : <ArrowRightOutlined />
            }
            accordion
            key={index}
          >
            <Panel key={index} header={item.header} className={styles.header}>
              <p id="para" className={styles.text}>
                {" "}
                {item.text}{" "}
              </p>
            </Panel>
          </Collapse>
        );
      })} */}
      <Collapse
        accordion
        expandIcon={({ isActive }) =>
          isActive ? <DownOutlined /> : <ArrowRightOutlined />
        }
        activeKey={activeKey}
        onChange={onChange}
      >
        <Panel
          className={styles.header}
          header="Trial of Hunting cases"
          key="1"
          id="1"
        >
          <p className={styles.text}>
            Trial of all cases of hunting, encroachment etc. registered under
            the Wildlife Act is conducted in the Court of Judicial Magistrate
            (First Class). Every taluka will have such a court for hearing
            criminal cases. The penalty for hunting and alteration of boundaries
            (encroachment) within a National Park or Sanctuary is imprisonment
            for 3 to 7 years and fine not less than Rs. 10,000/- There is no
            scope for compounding (only fine) such offences.{" "}
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Charge Sheet vs. Complaint"
          key="2"
          id="2"
        >
          <p className={styles.text}>
            All cases under the Wildlife Act are Complaint cases. A Complaint is
            an allegation made to a Magistrate either by an official under
            Section 55(b) or a citizen under Section 55(c) of the Wildlife Act
            or under Section 200 of the CrPC to set the law in motion on a
            criminal offence. A complaint to the Police is actually
            ‘Information’ about an offence which is registered as an FIR. Filing
            of a Charge Sheet or Police Report is not permissible.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Get an Official copy of PA Notification"
          key="3"
          id="3"
        >
          <p className={styles.text}>
            All Protected Area (PA) notifications are published by the
            Government in the Official Gazette. You can download PA
            notifications of interest and study them carefully. Since a PA
            comprises of multiple Reserved Forests (RF), you may also need to
            get certified copies of the RF Notifications to understand the
            various legal rights that have been recorded and allowed. Such
            rights may include foot paths or roads, settlements/villages, places
            of worship, water or forest produce etc.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Use satellite imagery to check encroachments"
          key="4"
          id="4"
        >
          <p className={styles.text}>
            Google Earth is an excellent tool to monitor forest encroachments.
            You can download this free tool from Google Earth website. It is
            simple to use and helps you check whether any forest has been
            cleared or existing settlements have expanded. You can also get
            imagery of previous years and compare it with the current situation.
            The freshly encroached area can be measured as well. Such
            time-series satellite imagery can also be used as evidence in a
            court.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Diff between a Govt. Dept. and Govt."
          key="5"
          id="5"
        >
          <p className={styles.text}>
            Did you know the difference between a Government Department and
            Government? To illustrate – the Forest Department is a Government
            Department while the Forest Secretariat, which is headed by an IAS
            officer of the rank of Principal Secretary, at the State Level, is
            Government.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Hunting / smuggling cases"
          key="6"
          id="6"
        >
          <p className={styles.text}>
            Several law enforcement agencies are empowered to initiate action in
            hunting and smuggling cases. These include: Local Police, the Crime
            Branch under the District Superintendent of Police, the CID Forest
            Cell of the Police, Forest Mobile Squad and Vigilance wing of the
            Forest Department and the Wildlife Crime Control Bureau. You could
            approach any of these, if you are not confident of sincere action
            from local forest department officials.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="RTI to seek management plans"
          key="7"
          id="7"
        >
          <p className={styles.text}>
            Please apply under the RTI Act and get a copy of the Management Plan
            of the National Park/Sanctuary or the Tiger Conservation Plan of the
            Tiger Reserve which you are trying to protect under a site based
            conservation monitoring program. Also apply for a certified copy of
            the Annual Plan of Operations (APO) which will give you details of
            the approved activities/civil works with budgets. These documents
            will be very useful for monitoring and advocacy.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Filing a petition"
          key="8"
          id="8"
        >
          <p className={styles.text}>
            Before filing a petition before the High Court or NGT please ensure
            that you first issue a notice/memorandum to the relevant or
            statutory authority seeking action. If that does not work, go ahead
            with the petition and enclose an acknowledged copy of the notice.
            This will insulate your petition from disposal/dismissal on this
            count since courts now verify if administrative remedies have been
            exhausted.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="RTI — Inspection of Public Works"
          key="9"
          id="9"
        >
          <p className={styles.text}>
            The RTI Act enables you to carry out an inspection of public works
            viz. Water hole, fire line, check dam, EPT, Solar fence etc. You can
            get these measured by a Chartered Engineer and even collect samples
            of the material for testing. You cannot be denied this right under
            the pretext that “it is in the core/critical tiger habitat” etc.
            Please see Section2 (j) (i) & (iii) and Section 3 of the RTI Act.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="File Inspection under RTI"
          key="10"
          id="10"
        >
          <p className={styles.text}>
            One can carry out an inspection of Government ‘Records’ (files)
            under the RTI Act. This will provide extremely useful information
            recorded in file notings, inspection reports, pending complaints and
            other documents. Use the same application form to seek inspection of
            records. Rule 4(f) specifies that the fee chargeable for inspection
            of files would be Rs 5/hour after the first hour, which is free.
            After inspection you can seek certified copies of documents.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Difference between a Sanctuary and National Park"
          key="11"
          id="11"
        >
          <p className={styles.text}>
            There are three key differences: 1. During the notification process,
            the Collector in consultation with the Chief Wildlife Warden can
            allow the continuation of certain rights of people inside a
            Sanctuary but not in a National Park. 2. The Chief Wildlife Warden
            can permit grazing of livestock only in a Sanctuary. 3. A Sanctuary
            can be upgraded as a National Park but not vice versa.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Section 55(c)"
          key="12"
          id="12"
        >
          <p className={styles.text}>
            The Wildlife (Protection) Act contains a provision that empowers
            activists to pursue violations that have not been acted upon by
            forest officers. A notice under Section 55(c) can be issued to the
            State Chief Wildlife Warden along with details and evidence (photos/
            videos/reports). If no action is initiated within 60 days despite
            this, you can file a complaint before the Jurisdictional Magistrate,
            who can take cognizance and commence a criminal trial against the
            accused person(s).
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Meeting with Officials"
          key="13"
          id="13"
        >
          <p className={styles.text}>
            Here’s a less well known fact about dealing with the bureaucracy.
            Whenever you meet an official, either in his or her office or in the
            field, make a note of the time, date and place along with the
            subject discussed. Make it a point to accurately quote the
            discussion/assurance that you may have received, along with the
            meeting date, etc. in any letter or reminder that you send. This
            will ensure that the meeting/interaction gets documented in
            government records.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Correspondence with Govt."
          key="14"
          id="14"
        >
          <p className={styles.text}>
            Did you know that Govt. officials are not bound to respond to any
            letter when their name/designation is in the ‘Copy to’ or ‘CC to’
            section? They will normally read and file the letter. Therefore
            whenever you are seeking action from multiple authorities, ensure
            that you address the letter to all of them (not copy to) in order of
            seniority. For example: To: 1. The Chief Wildlife Warden, XYZ State
            2. The Field Director – XYZ Tiger Reserve. 3. The Deputy Director –
            XYZ Tiger Reserve…
          </p>
        </Panel>
        <Panel className={styles.header} header="Filing RTIs" key="15" id="15">
          <p className={styles.text}>
            When you file an RTI, always apply for a ‘Certified Copy’. Obtaining
            a Certified Copy will be very useful, particularly when you have to
            file it in court or need to release it to the media. The document
            will be perceived as authentic. So, the next time you approach the
            Public Information Officer (PIO) please make sure you mention
            ‘Certified Copy’ (instead of just “Copy”) of the letter/document
            etc. in column no. 3 of the RTI form. Click here for more details on
            RTI.
          </p>
        </Panel>
        <Panel
          className={styles.header}
          header="Documenting Violations"
          key="16"
          id="16"
        >
          <p className={styles.text}>
            Whenever you observe a potential violation in the field, please
            collect as much evidence as possible. Take photos/videos – both wide
            angle and close ups. Find out the exact local name of the location,
            a GPS reading if possible, the name of the Range or Beat or
            Compartment and some prominent landmark (river/watch
            tower/waterhole…). Not only will your complaint be considered more
            seriously but the information will also help increase chances of
            detection, and aid investigation.
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Tips;
