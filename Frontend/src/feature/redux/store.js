import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authslice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
