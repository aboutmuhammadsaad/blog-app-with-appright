import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState{
    status: string,
    userData: null
}
const initialState: AuthState={
    status:"false",
    userData: null
}

const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.status="true";
            state.userData=action.payload.userData;
        },
        logout: (state)=>{
            state.status="false";
            state.userData=null;
        }
    }
})

export const {login, logout}=authSlice.actions;
export const selectCount = (state: RootState) => state.userData
export default authSlice.reducer;