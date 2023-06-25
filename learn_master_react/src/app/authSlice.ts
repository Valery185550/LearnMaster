import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthContext, AuthContextProps } from "react-oidc-context";

let initialState:any ={};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getAuth:(state, action)=>action.payload,
    }
})

const {actions, reducer} = authSlice;
export const {getAuth} = actions;
export default reducer;