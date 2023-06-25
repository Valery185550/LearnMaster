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
 

  async function myFetch(){
    const t = await fetch (`https://localhost:7002`, {
          headers:{
              "Accept": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
          }
      });
      let c = await t.json();
      setCourses(c);
      debugger;
  }
  
  useEffect(()=>{myFetch()},[])


  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logo}/>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.content}>
        {courses.map((c)=><CourseCard title={c.name} description={c.description} />)}
        <CourseCard title='' description=''/>
        <button onClick={()=>{auth.signoutRedirect()}}>Log Out</button>
      </div>
    </div>
  )
}