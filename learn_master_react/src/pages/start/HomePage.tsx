import React from "react";
import styles from "./HomePage.module.css";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export let auth:AuthContextProps;


export function HomePage() {

    auth  = useAuth();

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    let nav = "";
    const navigate = useNavigate();
    useEffect(()=>{ navigate(nav)},[nav]);
   
    if (auth.isAuthenticated) {

        
        if(auth.user?.profile.user_role == "Teacher"){
            nav="/Teacher"
        }
        nav = "/Student"
        return <></>
    }

    auth.signinRedirect();

    return <></>
    

}
