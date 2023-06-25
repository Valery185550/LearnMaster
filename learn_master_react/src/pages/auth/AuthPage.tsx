import React from 'react'
import {useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import LoginInput from '../../components/loginInput/LoginInput';
import Error from '../../components/error/Error';
import styles from "./Auth.module.css";

export default function AuthPage() {

    const {register, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
    
  return (
    <div className={styles.main}>
        <form className={styles.form} action='https://localhost:5001/Account/Login' method='post' >

            <h2 className={styles.header}>Account</h2>
            
            <LoginInput inputName='username' label='Username' placeholder='Enter your name' register={register}/>

      
            <br/><br/>

            <LoginInput inputName='password' label='Password' placeholder='Enter your password:' register={register}/>

            <br/><br/>

            <input className={styles.submit} type='submit' value="Log in"/>
        </form>
        <br/><br/>
    </div>
  )
}
