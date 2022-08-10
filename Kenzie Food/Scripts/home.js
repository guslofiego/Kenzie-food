import { HomeInfo } from "../Controller/Home/Home.js";
import { Cart } from "../Models/Home/Cart.js";
import { MainShowcase} from "../Models/Home/MainShowcase.js";
import { Filter } from "../Models/Home/Filter.js";
import { UserHome } from "../Models/Home/UserHome.js";

const productArray = await HomeInfo.getProductList();

const mainContent = document.querySelector(".main_content_products");
const asideCartElem = document.querySelector("#main_cart");
const cartUl = document.querySelector(".main_cart_product_list");
const quatity = document.getElementById("cart_quantity_value");
const totalValue = document.getElementById("cart_totalvalue_value");

const cart = new Cart(cartUl, quatity,totalValue,asideCartElem);
const mainShowcase = new MainShowcase(mainContent, productArray, cart);

async function cartUser() {
    const cart = await HomeInfo.getMycartList();
    const cartList = [];
    cart.forEach((elem) => {
        for (let index = 0; index < elem["quantity"]; index++) {
            cartList.push(elem["products"]);
        }
    })
    return cartList;
}

function filterEventBySection(event) {
    const sectionName = event.target.innerText;
    const allFilter = document.querySelectorAll(".main_content_filter_category")
    allFilter.forEach((filter) => {
        filter.classList.remove("liSelect");
    })
    event.target.closest("li").classList.add("liSelect");
    const filterProduct = Filter.filterBySection(productArray, sectionName);
    const filterShowcase = new MainShowcase(mainContent, filterProduct, cart);
    filterShowcase.listarProdutos();
}

function filterEventBySearch(event) {
    const inputValue = event.target.value;
    const filterProduct = Filter.filterByInput(productArray, inputValue);
    const filterShowcase = new MainShowcase(mainContent, filterProduct, cart);
    filterShowcase.listarProdutos();
}

function addEventFilter() {
    const all = document.getElementById("all");
    all.addEventListener("click", filterEventBySection);
    const backery = document.getElementById("backery");
    backery.addEventListener("click", filterEventBySection);
    const fruit = document.getElementById("fruit");
    fruit.addEventListener("click", filterEventBySection);
    const drink = document.getElementById("drink");
    drink.addEventListener("click", filterEventBySection);
    const searchInput = document.getElementById("search_input");
    searchInput.addEventListener("keyup", filterEventBySearch);
}

async function cartStorage() {
    if(!localStorage.getItem("Token") || localStorage.getItem("Token") === "[object Object]") {
        if(localStorage.getItem("cartIds")) {
            cart.cartProductsIds = localStorage.getItem("cartIds").split(",");
        }
        cart.cartProductsIds.forEach((elem) => {
            productArray.forEach((product) => {
                if(product.id === elem) {
                    cart.cartProducts.push(product);
                }
            })
        })
    } else {
        cart.cartProducts = await cartUser();
    }
    cart.showCartProducts(cart.cartProducts);
    cart.updateQuantity();
    cart.updateTotalValue();
}

cartStorage();


const mobileCartButton = document.getElementById("cart_button")
const mobileCarBackground = document.getElementById("mobile_cart_background")
const cartConteiner = document.querySelector(".main_cart")

function addEventMobileCartButton(mobileCartButton){
    mobileCartButton.addEventListener("click",(event) => {
        event.preventDefault()
        mobileCarBackground.classList.remove("hidden")
        cartConteiner.classList.remove("hidden")
    })
}

addEventMobileCartButton(mobileCartButton)

const closeCartButton = document.querySelector("#mobile_close_cart_button")

function addEventMobileCloseCartButton(closeCartButton){
    closeCartButton.addEventListener("click",(event) => {
        event.preventDefault()
        mobileCarBackground.classList.add("hidden")
        cartConteiner.classList.add("hidden")
    })
}

addEventMobileCloseCartButton(closeCartButton)

mainShowcase.listarProdutos();

addEventFilter();

UserHome.isLogedin();
