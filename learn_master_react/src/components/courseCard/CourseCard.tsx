import React from 'react';
import styles from "./CourseCard.module.css";

export default function CourseCard( {title, description}:{title:string, description:string}) {
  return (
    <div className={styles.main}>
        <p>{title}</p>
        <p>{description}</p>
    </div>
  )
}
