import React from 'react';
import styles from "./RegistrationPage.module.css";
import {useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import LoginInput from '../../components/loginInput/LoginInput';
import Error from '../../components/error/Error';
import { UserManager } from "oidc-client-ts" 
import { useHref } from 'react-router-dom';

var config = {
    authority: "https://localhost:5001",
    client_id: "js",
    redirect_uri: "https://localhost:5003/callback.html",
    response_type: "code",
    scope:"openid profile api1",
    post_logout_redirect_uri : "https://localhost:5003/index.html",
};

const um = new UserManager(config);
export default function Page() {

    console.log(window.location);
    const {register, handleSubmit, formState: { errors }} = useForm({criteriaMode: "all", mode: "onChange"});
    const onSubmit = async (data:object) => {

        debugger;
        let response = await fetch("https://localhost:7282/Home/Registration", {
            method:"POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json"},
            body:JSON.stringify(data)
        });

        let result = await response.text();
        if(+result === 0){
            alert("Already exists");
        }
        else if(+result === 1){
            alert("registered");
        }

    }     
    function identityServerAuth(){
        um.signinRedirect();
    }

    um.getUser().then(function (user) {
        console.log(user);
    });
    
  return (
    <div className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            
            <LoginInput inputName='name' label='Username' placeholder='Enter your name' register={register}/>
            <ErrorMessage  errors={errors} name="name" render={({ message }) => <Error message={message}/>}/>
      
            <br/><br/>

            <LoginInput inputName='password' label='Password' placeholder='Enter your password:' register={register}/>
            <ErrorMessage errors={errors} name="password" render={({ message }) => <Error message={message}/>}/>
            <br/><br/>

            <div className={styles.selectBlock}>
                <label>Choose who you are: </label>
                <select className={styles.selectBlock__select} {...register("role")} >
                    <option value="Student">Student</option>
                    <option  value="Teacher">Teacher</option>
                </select>
            </div>
            
            
            <br/><br/>

            <input className={styles.submit} type='submit' value="Submit"/>
        </form>
        <br/><br/>

        <a className={styles.link} onClick={identityServerAuth} >Have an account already?</a>
    </div>
  )
}
