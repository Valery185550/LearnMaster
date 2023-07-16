import React, {useState, useEffect} from 'react';
import styles from "./Notifications.module.css";
import { Logo } from '../../components/logo/Logo';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';
import { Notification}  from '../../components/notification/Notification';
import { Notification as NotifType } from '../../types';
import { getNotifications } from '../../app/api';

export const Notifications = () => {

    let [notifications, setNotification] = useState<NotifType[]>([]);
    useEffect(()=>{ getNotifications(setNotification)},[])

  return (
    <div className={styles.main}>
        <Logo/>
        <div className={styles.notifications}>
          {notifications.map((n)=><Notification id={n.id} setNotification={setNotification} text={n.text} />)}
        </div>
        <LogoutButton/>
    </div>
  )
}
