import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function StudentHomePage() {

    let [courses, getCourses] = useState();
    async function myFetch(){
      const t = await fetch (`https://localhost:7282/Home/Hello`, {
            headers:{
                "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
            }
        });
        debugger;
        courses = await t.json();

    }

    useEffect(()=>{myFetch()},[])
  return (
    <div>Hello</div>
  )
}
