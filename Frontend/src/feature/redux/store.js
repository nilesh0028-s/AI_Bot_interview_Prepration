import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authslice'
import interviewReducer from './interview/interviewSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        interview: interviewReducer
    }
})
