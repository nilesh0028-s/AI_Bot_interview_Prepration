import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, login, getme } from '../service/auth.api'
import axios from 'axios'

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    const res = await register(data.username, data.email, data.password)
    if (!res || res.message?.toLowerCase().includes('error') || res.message?.toLowerCase().includes('already')) 
        return rejectWithValue(res?.message || 'Registration failed')
    return res.user
})

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    const res = await login(data.email, data.password)
    if (!res || res.message?.toLowerCase().includes('invalid') || res.message?.toLowerCase().includes('error'))
        return rejectWithValue(res?.message || 'Login failed')
    return res.user
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true })
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
    const res = await getme()
    if (!res) return rejectWithValue('Failed to fetch profile')
    return res.user
})

const authSlice = createSlice({
    name: 'authreducer',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => { state.error = null }
    },
    extraReducers: (builder) => {
        const handlePending = (state) => { state.loading = true; state.error = null }
        const handleRejected = (state, action) => { state.loading = false; state.error = action.payload }

        builder
            .addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
            .addCase(registerUser.rejected, handleRejected)

            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
            .addCase(loginUser.rejected, handleRejected)

            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.user = null })
            .addCase(logoutUser.rejected, handleRejected)

            .addCase(fetchMe.pending, handlePending)
            .addCase(fetchMe.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
            .addCase(fetchMe.rejected, handleRejected)
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
