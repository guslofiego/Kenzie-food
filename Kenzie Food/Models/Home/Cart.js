import { HomeInfo } from "../../Controller/Home/Home.js";

export class Cart{
    constructor(parentElem, quantityElem, totalValueElem, asideElem){
        this.parentElem = parentElem;
        this.quantityElem = quantityElem;
        this.totalValueElem = totalValueElem;
        this.asideElem = asideElem;
        this.cartProducts = [];
        this.cartProductsIds = [];
    }

    showCartProducts(productsArray){
        this.parentElem.innerHTML = "";
        let arrayIndex = 0
        
        if(this.cartProducts.length === 0){
            this.asideElem.querySelector("#cart_empty_conteiner").style.display = "flex";
            this.parentElem.classList.add("hidden")
            this.asideElem.querySelector("#main_cart_quantity_conteiner").classList.add("hidden")
            this.asideElem.querySelector("#main_cart_totalValue_conteiner").classList.add("hidden")
        }else{
            this.asideElem.querySelector("#cart_empty_conteiner").style.display = "none";
            this.parentElem.classList.remove("hidden")
            this.asideElem.querySelector("#main_cart_quantity_conteiner").classList.remove("hidden")
            this.asideElem.querySelector("#main_cart_totalValue_conteiner").classList.remove("hidden")
        }

        productsArray.forEach(product => {
            const li = document.createElement("li")
            
            const imgProduct = document.createElement("img")
            const divContent = document.createElement("div")
            divContent.classList.add("main_cart_product_content")
            const h2 = document.createElement("h2")
            const pCategory = document.createElement("p")
            pCategory.classList.add("cart_product_category")
            const pPrice = document.createElement("p")
            pPrice.classList.add("cart_product_category")
            const button = document.createElement("button")
            const imgTrash = document.createElement("img")

            imgProduct.src = product.imagem
            h2.innerText = product.nome
            pCategory.innerText = product.categoria
            pPrice.innerText = `R$ ${product.preco.toFixed(2)}`
            imgTrash.src = "../Images/Home/trash.png"

            li.dataset.id = product.id
            li.dataset.index = arrayIndex

            this.removeProduct(button)
            
            divContent.append(h2,pCategory,pPrice)
            button.appendChild(imgTrash)
            li.append(imgProduct,divContent,button)
            
            this.parentElem.appendChild(li)
            arrayIndex++
        });
    }

    updateQuantity(){
        const total = this.cartProducts.length;
        this.quantityElem.innerText = total;
    }

    updateTotalValue(){
        const total = this.cartProducts.reduce((acum,{preco}) => acum + preco,0)
        this.totalValueElem.innerText = `R$ ${total.toFixed(2)}`;
    }

    async addToCart(newProduct){
        this.asideElem.querySelector("#cart_empty_conteiner").style.display = "none";

        this.parentElem.classList.remove("hidden")
        this.asideElem.querySelector("#main_cart_quantity_conteiner").classList.remove("hidden")
        this.asideElem.querySelector("#main_cart_totalValue_conteiner").classList.remove("hidden")
        
        
        if(!localStorage.getItem("Token") || localStorage.getItem("Token") === "[object Object]") {
            this.cartProducts.push(newProduct)
            this.cartProductsIds.push(newProduct.id)
            localStorage.setItem("cartIds", this.cartProductsIds)
            this.updateQuantity()
            this.updateTotalValue()
            this.showCartProducts(this.cartProducts)
        } else {
            const cartItem = {
                "product_id": newProduct.id
            }
            await HomeInfo.addCartProduct(cartItem);
            const cart = await HomeInfo.getMycartList();
            this.cartProducts = [];
            cart.forEach((elem) => {
                for (let index = 0; index < elem["quantity"]; index++) {
                    this.cartProducts.push(elem["products"]);
                }
            })
            this.updateQuantity();
            this.updateTotalValue();
            this.showCartProducts(this.cartProducts);
        }

    }

    async removeProduct(removeButton){
        removeButton.addEventListener("click",(event) => {
            if(!localStorage.getItem("Token") || localStorage.getItem("Token") === "[object Object]")  {
                event.preventDefault()
    
                const selectedProductArrayIndex = removeButton.closest("li").dataset.index
    
                this.cartProducts.splice(selectedProductArrayIndex,1)
    
                this.updateQuantity()
                this.updateTotalValue()
    
                this.showCartProducts(this.cartProducts)
    
                this.cartProductsIds = []
    
                this.cartProducts.forEach((elem) => {
                    this.cartProductsIds.push(elem.id)
                })
                localStorage.setItem("cartIds", this.cartProductsIds)

                if(this.cartProducts.length === 0){
                    this.asideElem.querySelector("#cart_empty_conteiner").style.display = "flex";
    
                    this.parentElem.classList.add("hidden")
                    this.asideElem.querySelector("#main_cart_quantity_conteiner").classList.add("hidden")
                    this.asideElem.querySelector("#main_cart_totalValue_conteiner").classList.add("hidden")
                }
            } else {
                const productId = removeButton.closest("li").dataset.id
                HomeInfo.deleteCartProduct(productId).then(()=>{     
                    HomeInfo.getMycartList().then((cart) => {
                        this.cartProducts = []
                        cart.forEach((elem) => {
                            for (let index = 0; index < elem["quantity"]; index++) {
                                this.cartProducts.push(elem["products"]);
                            }
                        })
                        this.updateQuantity()
                        this.updateTotalValue()
                        this.showCartProducts(this.cartProducts)
                        })
                    })

                if(this.cartProducts.length - 1 === 0){
                    this.asideElem.querySelector("#cart_empty_conteiner").style.display = "flex";
    
                    this.parentElem.classList.add("hidden")
                    this.asideElem.querySelector("#main_cart_quantity_conteiner").classList.add("hidden")
                    this.asideElem.querySelector("#main_cart_totalValue_conteiner").classList.add("hidden")
                }
            }
        })
    }
}