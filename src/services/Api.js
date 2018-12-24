import axios from "axios";
export const AXIOS = axios.create({
    baseURL: "http://dev-parcel.me/api/"
});

export default () => {
    AXIOS.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    return AXIOS;
};
