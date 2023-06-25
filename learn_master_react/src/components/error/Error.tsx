import React from 'react';
import styles from "./Error.module.css";

export default function Error({message}:{message:string}) {
  return (
    <div className={styles.main}>
        {message}
    </div>
  )
}
