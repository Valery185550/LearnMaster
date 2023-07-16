import React, {useEffect, useState} from 'react';
import styles from "./Lessons.module.css";
import { Link, useLoaderData } from 'react-router-dom';
import { Course, Lesson as LessonType } from '../../types';
import { LessonComponent } from '../../components/lesson/LessonComponent';
import { useSelector,} from 'react-redux';
import { RootState } from '../../app/store';
import { Logo } from '../../components/logo/Logo';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';

function sortLesson (lessons:any, lesson:any, setLessons:Function, level:number=1):any{
  let subLessons = lessons.filter((l:any)=>l.parentId==lesson.id);
  debugger;
  let children=[];
  if(subLessons.length!=0){

    children = subLessons.map((sl:any)=>sortLesson(lessons, sl,setLessons, level+1))
  }
  return [<LessonComponent   {...lesson} level={level} setLessons={setLessons} />, ...children]
}

export function LessonsPerCourse() {

  let {lessons, course} = useLoaderData() as {lessons:LessonType[], course:Course};
  let [currentLessons, setCurrentLessons] = useState(lessons);
  let sortedLessons:any[]=currentLessons.filter((l)=>l.parentId==null).map((l)=>sortLesson(currentLessons,l, setCurrentLessons));
  
  let auth = useSelector((state:RootState)=>state.auth);
  let backgroundUrl= auth.user?.profile.user_role == "Teacher"? styles.teacher : styles.student;
  let addNewLink = <Link className={styles.addNewButton} to={`/AddLesson/${null}/${course.id}`}>Add new</Link>;
  
  return (
    <div className={styles.main + " " + backgroundUrl}>
      <p className={styles.header}>{course?.title}</p>
      <div className={styles.lessons}>
        {auth.user?.profile.user_role == "Teacher"? addNewLink : null}
        {sortedLessons}
      </div> 
      <Link className={styles.chatLink} to={`/Chat/${course.id}`}>Chat</Link>
      <Logo/>
      <LogoutButton/>
    </div>
  )
}
