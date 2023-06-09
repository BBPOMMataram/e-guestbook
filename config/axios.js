import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SIJELAPP_URL_API,
});


// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export default instance