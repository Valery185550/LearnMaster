import React from 'react';
import styles from "./Logo.module.css";
import logo from "../../images/logo1.png";

export const Logo = () => {
  return <img className={styles.logo} src={logo}/>;
}
