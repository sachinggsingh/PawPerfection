import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/loginSlice';


export const store = configureStore({
   reducer: {
    auth :authReducer,
}
    
})  
