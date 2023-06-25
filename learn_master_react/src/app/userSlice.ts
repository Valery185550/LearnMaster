import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

const initialState:User = {
    id:-1,
    name:"",
    password:"",
    role:""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getUser:(state, action:PayloadAction<User>)=>action.payload
    }
})

const {actions, reducer} = userSlice;
export const {getUser} = actions;
export default reducer;