import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateReport, getUserReports, getReportById } from '../../interview/service/interview.api'

export const fetchGenerateReport = createAsyncThunk('interview/generate', async (formData, { rejectWithValue }) => {
    try {
        const res = await generateReport(formData)
        return res.data.report
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }
})

export const fetchUserReports = createAsyncThunk('interview/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await getUserReports()
        return res.data.reports
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }
})

export const fetchReportById = createAsyncThunk('interview/fetchById', async (interviewId, { rejectWithValue }) => {
    try {
        const res = await getReportById(interviewId)
        return res.data.report
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }
})
