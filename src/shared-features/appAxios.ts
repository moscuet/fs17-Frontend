import axios from "axios";

const appAxios = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export default appAxios