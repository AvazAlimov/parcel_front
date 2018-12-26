import Api from "./Api";

export default {
    create(account) {
        return new Promise((resolve, reject) => {
            Api()
                .post("/accounts", account)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    getAll(params, task) {
        return new Promise((resolve, reject) => {
            task.cancel = function() {
                resolve([]);
            };
            Api()
                .get("/accounts", params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};
