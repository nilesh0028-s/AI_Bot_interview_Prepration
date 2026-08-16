import axios from "axios";


 export async function register(username,email,password) {
    try {
        const response= await axios.post('http://localhost:5000/api/auth/register', {
            username, 
            email, 
            password
        },{
            withCredentials:true
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }
    
}
export async function login(email,password) {
    try {
        const response= await axios.post('http://localhost:5000/api/auth/login', {
            email, 
            password
        },{
            withCredentials:true
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }

}
export async function token() {
    try {
        const response= await axios.get('http://localhost:5000/api/auth/logout',{
            withCredentials:true
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
    
export async function getme() {
    try {
        const response= await axios.get('http://localhost:5000/api/auth/get-me',{
            withCredentials:true
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}