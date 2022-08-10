export class AdminInfo{
    static BASE_URL = "https://api-kenzie-food.herokuapp.com"

    static async getMyProductList(){
        const response = await fetch(`${this.BASE_URL}/my/products`,{ 
            headers : {
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        })
        .then(res => res.json())
        .catch(err => err)

        return response
    }

    static async createMyProduct(userData) {
        const res = await fetch(
            `${this.BASE_URL}/my/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(error);
        });
    }

    static async editMyProduct(userData, id) {
        const res = await fetch(
            `${this.BASE_URL}/my/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(error);
        });
    }

    static async deleteMyProduct(id) {
        const response = await fetch(
            `${this.BASE_URL}/my/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem("Token")}` 
            }
        })
        .then((res) => res.json())
        .catch((error) => console.log(error));
        return response;
    }
}