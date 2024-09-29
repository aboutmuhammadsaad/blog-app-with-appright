import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authslice"

export const makeStore = () => {
    return configureStore({
        reducer:authReducer
    }) 
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']