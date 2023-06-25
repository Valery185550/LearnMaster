import React from 'react';
import styles from "./LoginInput.module.css";

export default function LoginInput({label, placeholder, inputName, register}:{label:string, placeholder:string, inputName:string, register:Function }) {

  return (
    <div className={styles.main}>
        <label className={styles.label}>{label}</label>
        <input placeholder={placeholder} {...register(inputName, { required: "This is required.", minLength: { value: 8, message: "Minimum 8 signs" }})}name={inputName} className={styles.input}></input>
    </div>
  )
}
