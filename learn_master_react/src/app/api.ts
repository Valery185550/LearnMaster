export async function getCourses(setCourses:Function){
    const response = await fetch (`https://localhost:7002/getCourses`, {
          headers:{
              "Accept": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
          }
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
      body:JSON.stringify(data)
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

export async function searchCourse(name:string, setCourses:Function){
  const response = await fetch(`https://localhost:7002/SearchCourse?name=${name}`,{
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
//6786ddf9-233e-4022-b2f2-5b03ae2e6b37 teacher
//be3b96c0-0f2b-4517-83d7-c93eaf590b23 student

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