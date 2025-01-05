import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import adminReducer from './adminSlice';
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        task: taskReducer,
        admin: adminReducer,
        user: userReducer
    }
})

export default store;