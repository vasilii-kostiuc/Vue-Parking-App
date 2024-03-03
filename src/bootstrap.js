import axios from "axios";
 
window.axios = axios;
 
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "https://localhost:7041";