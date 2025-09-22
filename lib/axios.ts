import axios from "axios";
import { ENVIRONMENT } from "./env";

const headers = {
    "Content-Type" : "application/json"
}

const instance = axios.create({
    baseURL: ENVIRONMENT.APP_URL,
    headers: headers,
    timeout: 10 * 1000, // 10 seconds
    withCredentials: true
})

export default instance;