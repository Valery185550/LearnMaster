import React from 'react';
import styles from "./LogoutButton.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export function LogoutButton() {

    const auth = useSelector((state:RootState)=>state.auth);
  return (
    <a className={styles.main} onClick={()=>{auth.signoutRedirect()}}>Log Out</a>
  )
}
