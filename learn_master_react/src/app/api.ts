import { json } from "react-router-dom";
import { Homework, Lesson, Message } from "../types";

export async function getCourses(setCourses:Function){
    const response = await fetch (`https://localhost:7002/getCourses`, {
          headers:{
              "Accept": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
          },
          
      });
      let result = await response.json();
      setCourses(result);
}

export async function postCourse(data:any, setCourses:Function){
    const response = await fetch("https://localhost:7002/Course/PostCourse",{
      method:"POST",
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
      body:JSON.stringify(data),
    });
    const result = await response.json();
    setCourses(result);
}

export async function deleteCourse (id:number, setCourses:Function) {
    const response = await fetch(`https://localhost:7002/DeleteCourse?id=${id}`,{
      method:"Delete",
      headers: { 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    });
    const result = await response.json();
    setCourses(result)
}

export async function leaveCourse(id:number, setCourses:Function){
    const response = await fetch(`https://localhost:7002/LeaveCourse?id=${id}`,{
      method:"Delete",
      headers: { 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    });
    const result = await response.json();
    setCourses(result)
}

export async function searchCourse(title:string, setCourses:Function){
  const response = await fetch(`https://localhost:7002/SearchCourse?title=${title}`,{
      method:"Get",
      headers: { 
      "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    });
    const result = await response.json();
    debugger;
    setCourses(result)
}

export async function applyCourse(id:number, setCourses:Function){
  const response = await fetch(`https://localhost:7002/Apply?id=${id}`,{
    method:"Post",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.json();
  console.log(result);
  debugger;
  setCourses(result);
}

export async function getNotifications(setNotifications:Function){
  const response = await fetch(`https://localhost:7002/getNotifications`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.json();
  console.log(result);
  debugger;
  setNotifications(result);
}

export async function joinStudent(notificationId:number, setNotifications:Function){
  const response = await fetch(`https://localhost:7002/Join?notificationId=${notificationId}`,{
    method:"Delete",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.json();
  console.log(result);
  debugger;
  setNotifications(result);
}

export async function rejectNotification(notificationId:number, setNotifications:Function){
  const response = await fetch(`https://localhost:7002/Reject?notificationId=${notificationId}`,{
    method:"Delete",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.json();
  console.log(result);
  debugger;
  setNotifications(result);
}

export async function getLessons(courseId:number){
  const response = await fetch(`https://localhost:7002/getLessons?courseId=${courseId}`,{
    method:"GET",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.json();
  console.log(result);
  debugger;
  return result;
}

export async function getVideoByLessonId(lessonId:number){
  const response = await fetch(`https://localhost:7002/video?lessonId=${lessonId}`,{
    method:"GET",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });
  let result = await response.blob();
  let urlVideo = result.size == 0 ? null : URL.createObjectURL(result);
  debugger;
  return urlVideo;
}

export async function deleteLesson(lessonId:number, courseId:number, setLessons:Function){
  let response = await fetch(`https://localhost:7002/deleteLesson?lessonId=${lessonId}&courseId=${courseId}`,{
    method:"Delete",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let lessons = await response.json();
  debugger;
  setLessons(lessons);
}

export async function getLessonById(lessonId:number){
  let response = await fetch(`https://localhost:7002/Lesson?lessonId=${lessonId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let lesson = await response.json();
  debugger;
  return lesson;
}

export async function getCourseById(courseId:number){
  let response = await fetch(`https://localhost:7002/Course?courseId=${courseId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let course = await response.json();
  debugger;
  return course;
}

export async function postHomework(data:any){
  const formData = new FormData();
    
    formData.append("File", data.homework[0]);
    formData.append("LessonId", data.lessonId)

    let response = await fetch(`https://localhost:7002/Homework`,{
    method:"POST",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    body:formData
    });

    let result = await response.json();
    debugger;
    alert("OK");
}

export async function postLesson(data:any){
  const formData = new FormData();
    
    formData.append("Video", data.video[0]);
    formData.append("Title", data.title );
    formData.append("Text", data.text);
    formData.append("CourseId", data.courseId);
    formData.append("ParentId", data.parentId);

    const response = await fetch(`https://localhost:7002/newLesson`,{
    method:"POST",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    body:formData
    });

    let result = await response.text();
    debugger;
    alert("OK");
}

export async function getHomeworks(lessonId:number){
  let response = await fetch(`https://localhost:7002/Homeworks?lessonId=${lessonId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let result:Homework[] = await response.json();
  debugger;
  return  result;
}

export async function getHomeworkFile(homeworkId:number){
  let response = await fetch(`https://localhost:7002/HomeworkFile?homeworkId=${homeworkId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let result = await response.blob();
  let urlImg = URL.createObjectURL(result);

  debugger;
  return urlImg;
}

export async function getHomework(homeworkId:number){
  let response = await fetch(`https://localhost:7002/Homework?homeworkId=${homeworkId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let homework = await response.json();

  debugger;
  return homework;
}

export async function giveMark(data:any){

  const formData = new FormData(); 
  formData.append("homeworkId", data.homeworkId);
  formData.append("studentId", data.studentId);
  formData.append("mark", data.mark)

  let response = await fetch(`https://localhost:7002/Grade`,{
    method:"Post",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
    body:formData,
  });

  let result = await response.text();
  alert(result);
  debugger;
}

export async function getMessages (courseId:number){
  let response = await fetch(`https://localhost:7002/Messages?courseId=${courseId}`,{
    method:"Get",
    headers: { 
    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")},
  });

  let messages:Message[] = await response.json();

  debugger;
  return messages;
}

//6786ddf9-233e-4022-b2f2-5b03ae2e6b37 teacher
//be3b96c0-0f2b-4517-83d7-c93eaf590b23 student