import React, { useEffect, useState } from 'react'; 
import * as signalR from "@microsoft/signalr";
import styles from "./Student.module.css";
import { Course } from '../../types';
import CourseCard from '../../components/courseCard/CourseCard';
import { getCourses } from '../../app/api';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../components/logoutButton/LogoutButton';


export default function StudentHomePage() {

 

  /*let [messages, setMessages] = useState([""]);

  let[connection, setConnection] = useState( new signalR.HubConnectionBuilder().withUrl("/chat").build());
 
  useEffect(()=>{
  
  connection.on("send", data => {
    setMessages((mes)=>[data, ...mes])
  });
  connection.start().then(()=>{console.log("Started")});
  },[])
  

  return(
    <div>
      {messages.map((m)=><p>{m}</p>)}
      <button onClick={()=>{ debugger; connection.invoke("Send", "HELLO");}} >Send Hello</button>
    </div>
  ) */

  let [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(()=>{getCourses(setCourses)},[])

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Your courses</h2>
      {courses.map((c)=><CourseCard id={c.id} role="Student"setCourses={setCourses} title={c.name} description={c.description} />)}
      <Link className={styles.findNew} to="/FindCourse" >Find new course</Link>
      <LogoutButton/>
    </div>
  )


}