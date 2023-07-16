import React, { useState } from 'react';
import styles from "./ApplyCard.module.css";
import { applyCourse } from '../../app/api';
import { Course } from '../../types';

export function ApplyCard({id, title, description, applied, setCourses}:{setCourses:Function} & Course)
 {

  debugger;
  return (
    <div className={styles.main}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>

        {applied? <button className={styles.button + " " + styles.button__disabled} disabled={true}>Applyed</button>:<button className={styles.button + " " + styles.button__active} onClick={()=>{applyCourse(id, setCourses)}}>Apply</button> }
    </div>
  )
}
