import { createSlice } from "@reduxjs/toolkit";

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