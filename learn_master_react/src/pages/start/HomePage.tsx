import React from "react";
import styles from "./HomePage.module.css";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "../../app/authSlice";
import { SigninRedirectArgs } from "oidc-client-ts";

export function HomePage() {

    const auth  = useAuth();
    const dispatch = useDispatch();
    dispatch(getAuth(auth));
    
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

        debugger; 
        sessionStorage.setItem("tokenKey", auth.user?.access_token!);
        if(auth.user?.profile.user_role == "Teacher"){
            nav="/Teacher"
        }
        else if(auth.user?.profile.user_role == "Student"){
            nav = "/Student"
        }
        return <div>Unrecognized</div>
    }

    let r:SigninRedirectArgs={
        
    }
    auth.signinRedirect();

    return <></>
    

}
