import React from 'react'
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from '../../app/userSlice';
import { ErrorMessage } from '@hookform/error-message';
import LoginInput from '../../components/loginInput/LoginInput';
import Error from '../../components/error/Error';
import styles from "./Auth.module.css";

export default function AuthPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
    const onSubmit = async (data:any)=>{

        
        const response = await fetch(`https://localhost:7282/Home/Auth?password=${data?.password}`);
        const resultToken = await response.text();
        if(resultToken==="Not found"){
            alert("Not Fount")
        }

        
        else {
            dispatch(getUser(data));

            sessionStorage.setItem("tokenKey", resultToken);

            if(data.role=="Student"){
                navigate(`/Student`)
            }
            else{
                navigate(`/Teacher`)
            }
        }
        

        

        
    }
  return (
    <div className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <h2 className={styles.header}>Account</h2>
            
            <LoginInput inputName='name' label='Username' placeholder='Enter your name' register={register}/>
            <ErrorMessage  errors={errors} name="name" render={({ message }) => <Error message={message}/>}/>
      
            <br/><br/>

            <LoginInput inputName='password' label='Password' placeholder='Enter your password:' register={register}/>
            <ErrorMessage errors={errors} name="password" render={({ message }) => <Error message={message}/>}/>
            <br/><br/>

            <input className={styles.submit} type='submit' value="Log in"/>
        </form>
        <br/><br/>
    </div>
  )
}
