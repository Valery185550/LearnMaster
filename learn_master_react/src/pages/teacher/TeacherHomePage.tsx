import React, { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './TeacherHomePage.module.css';
import { useGetCoursesQuery } from '../../app/coursesSlice';
import CourseCard from '../../components/courseCard/CourseCard';
import logo from "../../images/logo1.png";

export default function HomePage() {

  const user = useSelector((state:RootState)=>state.user);
  const {data} = useGetCoursesQuery();

  async function myFetch(){
    const t = await fetch (`https://localhost:7282/Home/Courses`, {
          headers:{
              "Accept": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
          }
      });
      const res = await t.text();
  }

  useEffect(()=>{myFetch()},[])

  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logo}/>
      <h2 className={styles.header}>Your courses</h2>
      <div className={styles.content}>
        {
          data?.map((course)=><CourseCard title={course} description=''/>)
        }
        <CourseCard title='' description=''/>
      </div>
    </div>
  )
}