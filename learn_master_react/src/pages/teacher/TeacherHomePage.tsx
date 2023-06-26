import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './TeacherHomePage.module.css';
import CourseCard from '../../components/courseCard/CourseCard';
import logo from "../../images/logo1.png";
import { Course } from '../../types';


export function TeacherHomePage() {

  const auth = useSelector((state:RootState)=>state.auth);
  let [courses, setCourses] = useState<Course[]>([]);
 

  async function getCourses(){
    const t = await fetch (`https://localhost:7002/getCourses`, {
          headers:{
              "Accept": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
          }
      });
      let c = await t.json();
      setCourses(c);
      debugger;
  }
  
  useEffect(()=>{getCourses()},[])


  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logo}/>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.content}>
        {courses.map((c)=><CourseCard id={c.id} getCourses={getCourses} title={c.name} description={c.description} />)}
        <CourseCard id={-1} getCourses={getCourses} title='' description=''/>
 

      </div>
      <a className={styles.logoutButton} onClick={()=>{auth.signoutRedirect()}}>Log Out</a>
    </div> 
  )
}