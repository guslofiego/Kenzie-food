export class HomeInfo{
    static BASE_URL = "https://api-kenzie-food.herokuapp.com"

    static async getProductList(){
        const response = await fetch(
            `${this.BASE_URL}/products`
        )
        .then(res => res.json())
        .catch(err => err)

        return response
    }

    static async getMycartList(){
        const response = await fetch(
            `${this.BASE_URL}/cart`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
            }
        )
        .then(res => res.json())
        .catch(err => err)

        return response
    }

    static async addCartProduct(userData) {
        const res = await fetch(
            `${this.BASE_URL}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
            console.error(err);
        });

        return res;
    }

    static async deleteCartProduct(id) {
        const response = await fetch(
            `${this.BASE_URL}/cart/remove/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem("Token")}` 
            }
        })
        .then((res) => res.json())
        .catch((error) => error);
        return response;
    }
}