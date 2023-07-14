import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './TeacherHomePage.module.css';
import CourseCard from '../../components/courseCard/CourseCard';
import logo from "../../images/logo1.png";
import { Course, Notification } from '../../types';
import { getCourses, getNotifications } from '../../app/api';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';
import { Notification as Notif }  from '../../components/notification/Notification';


export function TeacherHomePage() {

  let [courses, setCourses] = useState<Course[]>([]);
  let [notifications, setNotification] = useState<Notification[]>([]);
  
  useEffect(()=>{getCourses(setCourses), getNotifications(setNotification)},[])


  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logo}/>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.content}>
        {courses.map((c)=><CourseCard id={c.id} role="Teacher" setCourses={setCourses} title={c.name} description={c.description} />)}
        <CourseCard id={-1} role="" setCourses={setCourses} title='' description=''/>
        <div >
          {notifications.map((n)=><Notif id={n.id} setNotification={setNotification} text={n.text} />)}
        </div>
      </div>
      
      <LogoutButton/>
    </div> 
  )
}