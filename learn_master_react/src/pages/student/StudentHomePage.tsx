import React, { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../types';

export default function StudentHomePage() {

    const user = useSelector((state:RootState)=>state.user);

    async function myFetch(){
      const t = await fetch (`https://localhost:7282/Home/Hello`, {
            headers:{
                "Accept": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
            }
        });
        const res = await t.text();
        alert(res + "Student");
    }

    useEffect(()=>{myFetch()},[])
  return (
    <div>Hello {user?.name}</div>
  )
}
