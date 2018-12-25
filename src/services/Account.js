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

    getAll() {
        return new Promise((resolve, reject) => {
            Api()
                .get("/accounts")
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};
