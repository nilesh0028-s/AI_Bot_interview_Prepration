import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/interview'

export async function register(username, email, password) {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { username, email, password }, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error)
    }
}