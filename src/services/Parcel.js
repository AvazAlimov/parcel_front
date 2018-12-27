import Api from "./Api";

export default {
    create(parcel) {
        return new Promise((resolve, reject) => {
            Api()
                .post("/parcels", parcel)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },

    getByCode(code) {
        return new Promise((resolve, reject) => {
            Api()
                .get("/parcels/" + code)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
};
