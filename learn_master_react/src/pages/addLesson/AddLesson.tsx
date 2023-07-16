import React from 'react';
import styles from "./AddLesson.module.css";
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lesson } from '../../types';
import { Logo } from '../../components/logo/Logo';
import { postLesson } from '../../app/api';

export const AddLesson = () => {
    let {courseId, parentId} = useLoaderData() as {courseId:number, parentId:number};
    const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
    debugger;

  const onSubmit = async (data:any) => {
    await postLesson(data);
  }

  return (
    <div className={styles.main}>
        <Logo/>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        
        <input className={styles.title} placeholder='type name of lesson' {...register("title")}/>
        <textarea className={styles.text} placeholder='text of lesson' {...register("text")}/>
        <input className={styles.inputVideo} type='file' {...register("video")}/>
        
        <input type='hidden' value={courseId} {...register("courseId")}/>
        <input type='hidden' value={parentId} {...register("parentId")}/>
       
        <input className={styles.submit} type='Submit' value="Add Lesson"/>
      </form>
    </div>
  )
}
