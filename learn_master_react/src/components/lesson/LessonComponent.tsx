import React from 'react'
import { Lesson } from '../../types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from "./LessonComponent.module.css";
import { deleteLesson } from '../../app/api';

export function LessonComponent({id, title, parentId, courseId, level, setLessons}:Lesson & {level:number, setLessons:Function}) {

  const auth = useSelector((state:RootState)=>state.auth);
  let addPath = `/AddLesson/${id}/${courseId}`;
  
  let buttons = <>
    <Link to={addPath} className={styles.button + " " + styles.addLink} >Add new </Link>
    <button className={styles.button + " " + styles.deleteButton} onClick={()=>{deleteLesson(id, courseId, setLessons)}}>Delete</button>
  </>

  return (
    <div style={{marginLeft:level*25}} className={styles.main + " " + (auth.user?.profile.user_role == "Teacher" ? styles.main__teacher:styles.main__student)}>
      <Link to={`/Lesson/${id}` } className={styles.name} >{title}</Link>
      {(auth.user?.profile.user_role == "Teacher" ? buttons:null)}
    </div>
    
  )
}
