import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, fetchMe } from './authThunks'

const handlePending = (state) => { state.loading = true; state.error = null }
const handleRejected = (state, action) => { state.loading = false; state.error = action.payload }
const handleUserFulfilled = (state, action) => { state.loading = false; state.user = action.payload }

const authSlice = createSlice({
    name: 'authreducer',
    initialState: { user: null, loading: false, error: null },
    reducers: {
        clearError: (state) => { state.error = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, handleUserFulfilled)
            .addCase(registerUser.rejected, handleRejected)

            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, handleUserFulfilled)
            .addCase(loginUser.rejected, handleRejected)

            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.user = null })
            .addCase(logoutUser.rejected, handleRejected)

            .addCase(fetchMe.pending, handlePending)
            .addCase(fetchMe.fulfilled, handleUserFulfilled)
            .addCase(fetchMe.rejected, handleRejected)
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
