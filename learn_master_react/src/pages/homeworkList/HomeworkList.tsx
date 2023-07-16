import React from 'react';
import styles from "./HomeworkList.module.css";
import { useLoaderData } from 'react-router-dom';
import { Homework } from '../../types';
import { HomeworkComponent } from '../../components/homework/HomeworkComponent';
import { Logo } from '../../components/logo/Logo';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';

export const HomeworkList = () => {

  let homeworks:Homework[] = useLoaderData() as Homework[];

  return (
    <div className={styles.main}>
        <Logo/>
        <div className={styles.linksBlock}>
          {homeworks?.map((h)=><HomeworkComponent id={h.id} studentName={h.studentName} mark={h.mark} />)}
        </div>
        <LogoutButton/>
    </div>
  )
}
