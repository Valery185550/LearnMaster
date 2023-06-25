import React from 'react';
import styles from "./CourseCard.module.css";
import {useForm} from "react-hook-form";


export default function CourseCard( {title, description}:{title:string, description:string}) {

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
  const onSubmit = async (data:object) => {
    const response = await fetch("https://localhost:7282/Home/CreateCourse",{
      method:"POST",
      headers: { "Accept": "application/json", 
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
      body:JSON.stringify(data)
    });
    const result = await response.text();
    alert(result);
  }

  return (
    <div className={styles.main}>
        {title === ""? 
          <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.addForm__inputName} {...register("name")} name="name" />
            <textarea className={styles.addForm__inputDesc} {...register("description")} name="description"/>
            <input className={styles.addForm__submit} type="submit" value="Add New Course"/>
          </form>
        : <>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        
          <a href='#' className={styles.moreButton}>More</a>
        </>}
        
    </div>
  )
}
