import React from 'react';
import styles from "./CourseCard.module.css";
import {useForm} from "react-hook-form";


export default function CourseCard( {id, title, description, getCourses}:{id:number,title:string, description:string, getCourses:Function}) {

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
  const onSubmit = async (data:object) => {
    const response = await fetch("https://localhost:7002/Course/PostCourse",{
      method:"POST",
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
      body:JSON.stringify(data)
    });
    const result = await response.text();
    debugger;
    getCourses();
    
  }

  const deleteCourse = async () =>{
    const response = await fetch(`https://localhost:7002/DeleteCourse?id=${id}`,{
      method:"Delete",
      headers: { 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    });
    const result = await response.text();
    debugger;
    getCourses();
  }
  return (
    <div className={styles.main}>
        {title === ""? 
          <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.addForm__inputName} {...register("Name")} name="Name" />
            <textarea className={styles.addForm__inputDesc} {...register("Description")} name="Description"/>
            <input className={styles.addForm__submit} type="submit" value="Add New Course"/>
          </form>
        : <>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        
          <div className={styles.buttons}>
            <a href='#' className={styles.moreButton}>More</a>
            <a className={styles.deleteButton} onClick={deleteCourse}>Delete</a>
          </div>
          
        </>}
        
    </div>
  )
}
