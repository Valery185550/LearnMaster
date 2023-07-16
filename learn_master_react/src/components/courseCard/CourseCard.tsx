import React from 'react';
import styles from "./CourseCard.module.css";
import {useForm} from "react-hook-form";
import { deleteCourse, leaveCourse, postCourse } from '../../app/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Course } from '../../types';


export default function CourseCard( {id, title, description, role, setCourses}: Course & {role:string,
   setCourses:Function}) {

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
  const onSubmit = async (data:object) => {
    postCourse(data, setCourses);
    
  }
  let auth = useSelector((state:RootState)=>state.auth);

  return (<div className={styles.main + " " + (auth.user?.profile.user_role == "Teacher"? styles.main__teacher:styles.main__student )}>
      {title === ""? 
          <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.addForm__inputTitle} placeholder='Title' {...register("Title")} required/>
            <textarea className={styles.addForm__inputDesc} placeholder='Description' {...register("Description")} name="Description" required/>
            <input className={styles.addForm__submit} type="submit" value="Add New Course"/>
          </form>
        : 
        <>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        
          <div className={styles.buttons}>
            <Link to={`/Lessons/${id}`} className={styles.button + " " + styles.moreButton + " " + (auth.user?.profile.user_role == "Teacher"? styles.button__teacher:styles.button__student)}>More</Link>
            {role=="Teacher"?<a className={styles.button + " " + styles.deleteButton + " " + (auth.user?.profile.user_role == "Teacher"? styles.button__teacher:styles.button__student)} onClick={()=>deleteCourse(id, setCourses)}>Delete</a>:<a className={styles.button + " " + styles.deleteButton + " " + (auth.user?.profile.user_role == "Teacher"? styles.button__teacher:styles.button__student)} onClick={()=>{leaveCourse(id, setCourses)}}>Leave</a>}
          </div>
        </>}
  </div>)
}
