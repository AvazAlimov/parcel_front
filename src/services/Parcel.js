import Api from "./Api";

export default {
    accept(acceptance) {
        return new Promise((resolve, reject) => {
            Api()
                .post("parcel/", acceptance)
                .then(response => resolve(response.data))
                .catch(error => {
                    if (error.response) {
                        reject(error.response);
                    } else if (error.request) {
                        reject(new Error("No response was received"));
                    } else {
                        reject(new Error("Error in request"));
                    }
                });
        });
    }
};
