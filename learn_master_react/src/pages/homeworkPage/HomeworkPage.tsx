import React from 'react';
import styles from "./HomeworkPage.module.css";
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { giveMark } from '../../app/api';
import { Homework } from '../../types';

export const HomeworkPage = () => {

    let {urlImg, homework} = useLoaderData() as {urlImg:string, homework:Homework};
    const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
    const onSubmit = async (data:object) => {
    await giveMark(data);
  }

  let formGiveMark = <form className={styles.markForm} onSubmit={handleSubmit(onSubmit)}>
  <input className={styles.markInput} placeholder='Mark' {...register("mark")} min={1} max={12} type='number'/>
  <input type='hidden'  value={homework.id} {...register("homeworkId")}/>
  <input type='hidden'  value={homework.studentId} {...register("studentId")}/>
  <input className={styles.markSubmit} type='submit'  value="Give"/>
</form>

  return (
    <div className={styles.main}>
        <p className={styles.header}>{homework.studentName}</p>
        <img className={styles.img} src={urlImg}/>
        {homework.mark==0 ? formGiveMark:null}
    </div>
  )
}
