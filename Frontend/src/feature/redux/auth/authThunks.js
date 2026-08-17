import { createAsyncThunk } from '@reduxjs/toolkit'
import { register, login, logout, getme } from '../../auth/service/auth.api'


export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    const res = await register(data.username, data.email, data.password)
    if (!res?.user) return rejectWithValue(res?.message || 'Registration failed')
    return res.user
})

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    const res = await login(data.email, data.password)
    if (!res?.user) return rejectWithValue(res?.message || 'Login failed')
    return res.user
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    const res = await logout()
    if (!res) return rejectWithValue('Logout failed')
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
    const res = await getme()
    if (!res?.user) return rejectWithValue('Not authenticated')
    return res.user
})
