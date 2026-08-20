import { createSlice } from '@reduxjs/toolkit'
import { fetchGenerateReport, fetchUserReports, fetchReportById } from './interviewThunks'

const handlePending = (state) => { state.loading = true; state.error = null }
const handleRejected = (state, action) => { state.loading = false; state.error = action.payload }

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        report: null,
        reports: [],
        loading: false,
        error: null
    },
    reducers: {
        clearReport: (state) => { state.report = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenerateReport.pending, handlePending)
            .addCase(fetchGenerateReport.fulfilled, (state, action) => { state.loading = false; state.report = action.payload })
            .addCase(fetchGenerateReport.rejected, handleRejected)

            .addCase(fetchUserReports.pending, handlePending)
            .addCase(fetchUserReports.fulfilled, (state, action) => { state.loading = false; state.reports = action.payload })
            .addCase(fetchUserReports.rejected, handleRejected)

            .addCase(fetchReportById.pending, handlePending)
            .addCase(fetchReportById.fulfilled, (state, action) => { state.loading = false; state.report = action.payload })
            .addCase(fetchReportById.rejected, handleRejected)
    }
})

export const { clearReport } = interviewSlice.actions
export default interviewSlice.reducer
