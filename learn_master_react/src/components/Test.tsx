import React from 'react'
import { um } from '../pages/start/RegistrationPage'

export default function Test() {
  return (
    <div onClick={()=>um.signoutRedirect()}>LogOut</div>
  )
}

