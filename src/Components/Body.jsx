import React from "react";
import styles from "./Body.module.css";
import ListPanel from "./ListPanel";
import Tasks from "./Tasks";

const Body = () => {
  return (
    <div className={styles.mainBody}>
      <ListPanel />
      <Tasks />
    </div>
  );
};

export default Body;
