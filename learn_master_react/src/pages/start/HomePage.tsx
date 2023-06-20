import React from "react";
import styles from "./HomePage.module.css";
import { useAuth } from "react-oidc-context";
import { ErrorMessage } from '@hookform/error-message';
import LoginInput from '../../components/loginInput/LoginInput';
import Error from '../../components/error/Error';
import {useForm} from "react-hook-form";

export function HomePage() {

    const auth = useAuth();

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
        <div>
            Hello {auth.user?.profile.sub}{" "}
            <button onClick={() => void auth.signoutRedirect({post_logout_redirect_uri:"https://localhost:5003"})}>Log out</button>
        </div>
        );
    }

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

        <a className={styles.link} onClick={() => void auth.signinRedirect()} >Have an account already?</a>
    </div>
  )
}
