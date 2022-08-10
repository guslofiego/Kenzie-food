import{UserApi} from "./../../Controller/Home/User.js"

class User {

    static returnDataSignup() {
        const dateSignup = {};
        const signupForm = document.querySelector("form");
        const inputForm = [...signupForm];
        inputForm.forEach((item) => {
        if(item.name != "") {
            dateSignup[item.name] = item.value;
        }
    });
    return dateSignup;
    }

}

const container = document.createElement("div");
const containerForm = document.querySelector(".cardCadastro");
containerForm.appendChild(container);
container.id = "container";

const button = document.getElementById("botao");
button.addEventListener("click", async (event) => {
    event.preventDefault();
    const res = await UserApi.userSignup(User.returnDataSignup());
    const cont = document.getElementById("container");
    if(res["status"] === "Error" || res === "User Already Exists!") {
        const error = document.createElement("p");
        error.classList.add("error");
        error.innerText = "Erro ao cadastrar";
        cont.innerHTML="";
        cont.appendChild(error);
    } else {
        window.location.href = "./../../Pages/login.html"
    }
    
})

const tittle = document.querySelector("h1");
tittle.addEventListener("click", () => window.location = "./../../Pages/index.html")

