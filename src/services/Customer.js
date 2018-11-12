import Api from "./Api";

export default {
    create(customer) {
        return new Promise((resolve, reject) => {
            Api()
                .post("customers/", customer)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response.status);
                    } else if (error.request) {
                        reject(new Error("No response was received"));
                    } else {
                        reject(new Error("Error in request"));
                    }
                });
        });
    },
    get(query, task) {
        return new Promise((resolve, reject) => {
            task.cancel = function() {
                resolve({ results: [] });
            };
            Api()
                .get("customers/?search=" + query.toLowerCase())
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response.status);
                    } else if (error.request) {
                        reject(new Error("No response was received"));
                    } else {
                        reject(new Error("Error in request"));
                    }
                });
        });
    }
};
