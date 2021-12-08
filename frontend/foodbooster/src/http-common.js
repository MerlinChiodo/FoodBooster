//Initialisierung der API zum Backend
import axios from "axios";

axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: "http://localhost:80/api/",
    headers: {
        "Content-type": "application/json"
    }
});