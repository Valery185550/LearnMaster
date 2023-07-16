import React from 'react';
import styles from "./HomeworkComponent.module.css";
import { Homework } from '../../types';
import { Link } from 'react-router-dom';

export const HomeworkComponent = ({id, studentName, mark}:{id:number,studentName:string, mark:number}) => {

  let mainStyle = mark==0 ? styles.unchecked:styles.checked;
  return (
    <Link className={styles.main + " " + mainStyle} to={`/Homework/${id}`}>
        <p className={styles.name}>{studentName}</p>
        <p className={styles.mark}>{mark==0?null:mark}</p>
    </Link>
  )
}
