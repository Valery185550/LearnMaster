import React, { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../types';
import styles from './TeacherHomePage.module.css';
import CourseCard from '../../components/courseCard/CourseCard';

export default function HomePage() {
  const user = useSelector((state:RootState)=>state.user);

  async function myFetch(){
    const t = await fetch (`https://localhost:7282/Home/Hello`, {
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
      <CourseCard title="Basics in IT" description="hkjbhjgvjgchcfmgfxxgmcgfchfchfchfchfc"/>
      <CourseCard title="Basics in IT" description="hkjbhjgvjgchcfmgfxxgmcgfchfchfchfchfc"/>
    </div>
  )
}