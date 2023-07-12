import React from 'react';
import styles from "./CourseCard.module.css";
import {useForm} from "react-hook-form";
import { deleteCourse, leaveCourse, postCourse } from '../../app/api';


export default function CourseCard( {id, title, description, role, setCourses}:{id:number,title:string, description:string, role:string,
   setCourses:Function}) {

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
  const onSubmit = async (data:object) => {
    postCourse(data, setCourses);
    
  }

  return (
    <div className={styles.main}>
        {title === ""? 
          <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.addForm__inputName} placeholder='Title' {...register("Name")} name="Name" />
            <textarea className={styles.addForm__inputDesc} placeholder='Description' {...register("Description")} name="Description"/>
            <input className={styles.addForm__submit} type="submit" value="Add New Course"/>
          </form>
        : <>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        
          <div className={styles.buttons}>
            <a href='#' className={styles.moreButton}>More</a>
            {role=="Teacher"?<a className={styles.deleteButton} onClick={()=>deleteCourse(id, setCourses)}>Delete</a>:<a className={styles.deleteButton} onClick={()=>{leaveCourse(id, setCourses)}}>Leave</a>}
          </div>
          
        </>}
        
    </div>
  )
}
