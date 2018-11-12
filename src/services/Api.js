import axios from "axios";

export const AXIOS = axios.create({
    baseURL: "http://68.183.72.187/api/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default () => {
    return AXIOS;
};
