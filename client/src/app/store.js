import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { authReducers } from "../features/Auth/AuthSlice";


export const store = configureStore({  
	reducer : {
		[apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducers
	}, 
	middleware : getDefaultMiddleware => 
          getDefaultMiddleware().concat(apiSlice.middleware),
	devTools : true 
});