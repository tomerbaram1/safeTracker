import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./AuthSlice"
import SosReducer from "./SosSlice"
export const store = configureStore({
    reducer:{
      auth:AuthReducer,
      sos:SosReducer

    },
})