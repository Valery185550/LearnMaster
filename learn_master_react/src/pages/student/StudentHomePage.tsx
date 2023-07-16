import React, { useEffect, useState } from 'react'; 
import styles from "./Student.module.css";
import { Course } from '../../types';
import CourseCard from '../../components/courseCard/CourseCard';
import { getCourses } from '../../app/api';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';


export default function StudentHomePage() {

  let [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(()=>{getCourses(setCourses)},[])

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.courses}>
        {courses.map((c)=><CourseCard id={c.id} role="Student"setCourses={setCourses} title={c.title} description={c.description} />)}
      </div>
      
      <Link className={styles.findNew} to="/FindCourse" >Find new course</Link>
      <LogoutButton/>
    </div>
  )


}