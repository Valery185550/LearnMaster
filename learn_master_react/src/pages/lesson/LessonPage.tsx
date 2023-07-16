import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { Lesson } from '../../types';
import styles from "./LessonPage.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useForm } from 'react-hook-form';
import { postHomework } from '../../app/api';
import { Logo } from '../../components/logo/Logo';

export const LessonPage = () => {

  let {lesson, urlVideo} = useLoaderData() as {lesson:Lesson, urlVideo:string}
  let auth = useSelector((state:RootState)=>state.auth);
  let role = auth.user?.profile.user_role;

  const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
  let onSubmit = async (data:any)=>{
    let result = await postHomework(data);
    debugger;
  }
  let homeworkForm = <form onSubmit={handleSubmit(onSubmit)}>
    <input className={styles.homeworkInput} type="file" {...register("homework")} />
    <input type='hidden' {...register("lessonId")} value={lesson.id}/>
    <input type="Submit" value="Send"/>
  </form>

  return (
    <div className={styles.main + " " + (role=="Teacher"?styles.main__teacher:styles.main__student)}>
        <Logo/>
        <p className={styles.title}>{lesson.title}</p>
        <pre className={styles.text}>{lesson.text}</pre>
        {urlVideo!==null ? <video className={styles.video} src={urlVideo} controls></video>:null}
        {role=="Student"?homeworkForm:<Link className={styles.homeworkLink} to={`/Homeworks/${lesson.id}`}>Homeworks</Link>}
    </div>
  )
}
