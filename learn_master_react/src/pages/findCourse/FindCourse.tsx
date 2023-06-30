import React, {useState} from 'react';
import styles from "./FindCourse.module.css";
import { searchCourse } from '../../app/api';
import { Course } from '../../types';
import { ApplyCard } from '../../components/applyCard/ApplyCard';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';

export function FindCourse() {
    let [searchWord, setSearchWord] = useState("");
    let [courses, setCourses] = useState<Course[]>([]);
    
  return (
    <div className={styles.main}>
        <div className={styles.search}>
            <input className={styles.search__input} onChange={(e)=>{setSearchWord(e.target.value)}} value={searchWord}  placeholder='Type name of course ...'/>
            <button className={styles.search__find} onClick={()=>{searchCourse(searchWord, setCourses)}}>Find</button>
        </div>
        <div className={styles.content}>
            {courses.map((c)=><ApplyCard setCourses={setCourses} {...c} />)}
        </div>
       <LogoutButton/>
    </div>
  )
}
