class UserApi {
    static url = "https://api-kenzie-food.herokuapp.com";

    static async userSignup(userData) {
        const URL = `${this.url}/auth/register`;

        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
        return res;
    }

    static async userLogin(userData) {
        const URL = `${this.url}/auth/login`;

        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();

        })
        .then((response) => {
            localStorage.setItem("Token", response);
        })
        .catch((err) => {
            console.error(err);
        });
    }
}


export { UserApi }
