import React from "react";
import TypeIt from "typeit-react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <TypeIt element={"h1"}>
        <span>To-Do List</span>
      </TypeIt>
    </div>
  );
};

export default Header;
