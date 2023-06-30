import React from 'react';
import styles from "./Notification.module.css";
import { joinStudent, rejectNotification } from '../../app/api';

export function Notification({id,text, setNotification}:{id:number, text:string, setNotification:Function}) {
  return (
    <div className={styles.main}>
      {text}
      <button onClick={()=>{joinStudent(id, setNotification)}}>Join</button>
      <button onClick={()=>{rejectNotification(id, setNotification)}}>Reject</button>
    </div>
  )
}
