export class UserHome{
    
    static login() {
        
        window.location.href = "./login.html"
        
    }

    static logout() {
        localStorage.removeItem("Token")
        window.location.reload()
        UserHome.isLogedin()
    }

    static signup() {

        window.location.href = "./signup.html"

    }

    static admin() {

        window.location.href = "./admin.html"

    }

    static isLogedin() {
        const avatar = document.getElementById("home_profile_img")
        const div = document.querySelector(".login_button_conteiner")
        div.innerHTML = ""

        if(localStorage.getItem("Token") === "undefined" || !localStorage.getItem("Token") || localStorage === ["object Object"]) {
            avatar.classList.add("hidden")
            
            const buttonLogin =  document.createElement("button")
            const buttonSignup = document.createElement("button")
            buttonLogin.id = "home_login_button" 
            buttonSignup.id = "home_signup_button"
            buttonLogin.innerText = "Login"
            buttonSignup.innerText = "Cadastrar"

            buttonLogin.addEventListener ("click", UserHome.login)
            buttonSignup.addEventListener ("click", UserHome.signup)

            div.appendChild(buttonLogin)
            div.appendChild(buttonSignup)

            } else {

                const buttonLogout = document.createElement("button")
                const buttonAdmin = document.createElement("button")
                buttonLogout.id = "home_logout_button"
                buttonAdmin.id = "admin_logout_button"
                buttonLogout.innerText = "Logout"
                buttonAdmin.innerText = "Profile"

                avatar.classList.remove("hidden")
                div.appendChild(buttonLogout)
                div.appendChild(buttonAdmin)
                buttonAdmin.addEventListener("click", UserHome.admin)
                buttonLogout.addEventListener("click", UserHome.logout)
            }
    
    }
}