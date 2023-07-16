import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styles from './TeacherHomePage.module.css';
import CourseCard from '../../components/courseCard/CourseCard';
import { Course} from '../../types';
import { getCourses, getNotifications } from '../../app/api';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';
import { Logo } from '../../components/logo/Logo';
import { Link } from 'react-router-dom';


export function TeacherHomePage() {

  let [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(()=>{getCourses(setCourses)},[])


  return (
    <div className={styles.main}>
      <Logo/>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.courses}>
        {courses.map((c)=><CourseCard id={c.id} role="Teacher" setCourses={setCourses} title={c.title} description={c.description} />)}
        <CourseCard id={-1} role="" setCourses={setCourses} title='' description=''/>
      </div>
      <Link className={styles.notifButton} to="/Notifications">Notifications</Link>
      <LogoutButton/>
    </div> 
  )
}