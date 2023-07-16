import React from 'react';
import styles from "./Notification.module.css";
import { joinStudent, rejectNotification } from '../../app/api';

export function Notification({id,text, setNotification}:{id:number, text:string, setNotification:Function,}) {
  return (
    <div className={styles.main}>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonsBlock}>
        <button className={styles.button} onClick={()=>{joinStudent(id, setNotification)}}>Join</button>
        <button className={styles.rejectButton + " " + styles.button} onClick={()=>{rejectNotification(id, setNotification)}}>Reject</button>
      </div>
      
    </div>
  )
}
