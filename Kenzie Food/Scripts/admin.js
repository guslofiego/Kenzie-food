import { MyProduct } from "../Models/Admin/MyProducts.js";
import { AdminInfo } from "../Controller/Admin/Admin.js";
import { FilterMyProduct } from "../Models/Admin/FilterMyProducts.js";

let myProductList = await AdminInfo.getMyProductList()

const ulElem = document.querySelector("#myProductList")

function submitShowEvents() {
    const btnShowNewProduct = document.querySelector(".addNewProduct");
    btnShowNewProduct.addEventListener("click", MyProduct.showCreateMenu)
    const btnCloseCreateMenu = document.getElementById("closeCreateMenu");
    btnCloseCreateMenu.addEventListener("click", MyProduct.closeCreateMenu);
    const btnCloseEditMenu = document.getElementById("closeEditMenu");
    btnCloseEditMenu.addEventListener("click", MyProduct.closeEditMenu);
    const btnCloseDeleteMenu = document.getElementById("closeDeleteMenu");
    btnCloseDeleteMenu.addEventListener("click", MyProduct.closeDeleteMenu);
    const btnNoDeleteMenu = document.getElementById("noRemove");
    btnNoDeleteMenu.addEventListener("click", MyProduct.closeDeleteMenu);
    const userIcon = document.getElementById("userIcon");
    userIcon.addEventListener("click", MyProduct.showLogoutMenu);
    const main= document.querySelector("main");
    main.addEventListener("click", MyProduct.closeLogoutMenu)
    const options = document.querySelectorAll(".productCategoryOption");
    options.forEach((option) => {
        option.addEventListener("click", selectCategory)
    })
    const btnExcludeEditMenu = document.querySelector(".btnEditRemove");
    btnExcludeEditMenu.addEventListener("click", MyProduct.showRemoveOptionEdit);
    const allFilter = document.querySelector(".all");
    allFilter.addEventListener("click", filterEventBySection);
    const backeryFilter = document.querySelector(".backery");
    backeryFilter.addEventListener("click", filterEventBySection);
    const fruitFilter = document.querySelector(".fruit");
    fruitFilter.addEventListener("click", filterEventBySection);
    const drinkFilter = document.querySelector(".drink");
    drinkFilter.addEventListener("click", filterEventBySection);
    const inputSearch = document.querySelector(".inputSearch");
    inputSearch.addEventListener("keyup", filterEventBySearch);
    const btnNewProduct = document.getElementById("btnNewProduct");
    btnNewProduct.addEventListener("click", newProductEvent);
    const btnEditProduct = document.querySelector(".btnEditSave");
    btnEditProduct.addEventListener("click", editProductEvent);
    const btnYesDeleteMyProduct = document.getElementById("yesRemove");
    btnYesDeleteMyProduct.addEventListener("click", deleteProductEvent);
    const btnLogout = document.querySelector(".btnLogout");
    btnLogout.addEventListener("click", logoutEvent);
    const tittleKenzie = document.querySelector("h1");
    tittleKenzie.addEventListener("click", goHome);
    const statusSucessCloseMenu = document.getElementById("statusSucessCloseMenu");
    statusSucessCloseMenu.addEventListener("click", MyProduct.closeStatusSucess);
    const statusErrorCloseMenu = document.getElementById("statusErrorCloseMenu");
    statusErrorCloseMenu.addEventListener("click", MyProduct.closeStatusError)
}

function selectCategory(event) {
    const options = document.querySelectorAll(".productCategoryOption");
    options.forEach((option) => {
        option.classList.remove("productCategoryOptionSelect");
    })
    event.target.classList.add("productCategoryOptionSelect");
}

function filterEventBySection(event) {
    const filter = document.querySelectorAll(".filter")
    filter.forEach((elem) => {
        elem.classList.remove("filterSelect");
    })
    const sectionName = event.target.innerText;
    event.target.closest("li").classList.add("filterSelect")
    const filterProduct = FilterMyProduct.filterBySection(myProductList, sectionName);
    MyProduct.showMyProducts(ulElem, filterProduct)  
}

function filterEventBySearch(event) {
    const inputValue = event.target.value;
    const filterProduct = FilterMyProduct.filterByInput(myProductList, inputValue);
    MyProduct.showMyProducts(ulElem, filterProduct);
}

async function newProductEvent(event) {
    event.preventDefault();
    const inputValues = MyProduct.createMyProduct();
    await AdminInfo.createMyProduct(inputValues);
    const newProductList = await AdminInfo.getMyProductList();
    MyProduct.closeCreateMenu();
    MyProduct.showMyProducts(ulElem, newProductList);
    if(newProductList.length === myProductList.length) {
        const statusError = document.getElementById("statusError");
        statusError.classList.remove("hidden");
    } else {
        const statusSucess = document.getElementById("statusSucess");
        statusSucess.classList.remove("hidden");
        myProductList = newProductList
    }
}

async function editProductEvent(event) {
    event.preventDefault();
    const inputValues = MyProduct.editMyProduct();
    await AdminInfo.editMyProduct(inputValues, MyProduct.productId);
    const newProductList = await AdminInfo.getMyProductList();
    MyProduct.closeEditMenu();
    MyProduct.showMyProducts(ulElem, newProductList);
}

async function deleteProductEvent() {
    const productId = MyProduct.productId;
    await AdminInfo.deleteMyProduct(productId);
    const newProductList = await AdminInfo.getMyProductList();
    MyProduct.closeDeleteMenu();
    MyProduct.showMyProducts(ulElem, newProductList);
}

function logoutEvent() {
    localStorage.removeItem("Token")
    window.location = "./../Pages/index.html"
}

function isLogedAdmin() {
    if(!localStorage.getItem("Token") || localStorage.getItem("Token") === "[object Object]") {
        window.location = "./../Pages/index.html"
    } 
}

function goHome() {
    window.location = "./../Pages/index.html"
}

isLogedAdmin();

submitShowEvents();

MyProduct.showMyProducts(ulElem, myProductList);
