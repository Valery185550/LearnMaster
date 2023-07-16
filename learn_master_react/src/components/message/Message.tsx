import React from 'react';
import styles from "./Message.module.css";

export const Message = ({name, date, text}:{name:string, date:string, text:string}) => {
  return (
    <div className={styles.main}>
        <p className={styles.name}>{name}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.text}>{text}</p>
    </div>
  )
}
