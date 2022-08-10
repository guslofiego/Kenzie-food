import { UserApi } from "./../../Controller/Home/User.js"


const loginForm = document.querySelector('button');

const tittle = document.querySelector("h1");
tittle.addEventListener("click", () => window.location = "./../../Pages/index.html")

class LoginUsuario {
    static async dataLogin(event) {
        event.preventDefault();
        const data = LoginUsuario.transformData();
        const response = await UserApi.userLogin(data);

        if (localStorage.getItem("Token") !== '[object Object]') {
            LoginUsuario.MainpageGo();
            window.location = "./../../Pages/index.html";
        } else {
            LoginUsuario.invalidLogin();
        }
    }

    static transformData() {
        const form = document.querySelector("form")
        const itensForm = [...form];
        const data = {};

        itensForm.forEach((item) => {
            if (item.name !== '') {
                data[item.name] = item.value;
            }
        });
        return data;
    }

    static MainpageGo() {
        window.location = './../Pages/index.html';
    }

    static invalidLogin() {
        const parent = document.querySelector('.login__createAccount');
        const script = document.createElement("p");
        LoginUsuario.invalidLoginClean();
        script.classList.add('login__error');
        script.innerText = 'E-mail ou senha inválidos';
        parent.appendChild(script);
        return parent;
    }

    static invalidLoginClean() {
        const parent = document.querySelector('.login__form.formEmpty');
        const script = document.querySelector('.login__error');
        if (script !== null) {
            parent.removeChild(script);
            return parent;
        }
    }
}


loginForm.addEventListener('click', LoginUsuario.dataLogin)





