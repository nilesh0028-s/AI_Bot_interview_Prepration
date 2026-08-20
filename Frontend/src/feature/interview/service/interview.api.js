import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/interview'

export const generateReport = (formData) =>
    axios.post(BASE_URL, formData, { withCredentials: true })

export const getUserReports = () =>
    axios.get(BASE_URL, { withCredentials: true })

export const getReportById = (interviewId) =>
    axios.get(`${BASE_URL}/report/${interviewId}`, { withCredentials: true })
