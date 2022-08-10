import {Showcase} from "./Showcase.js"

export class MainShowcase extends Showcase{
    constructor(parentElem, productList, cart) {
        super(parentElem, productList);
        this.cart = cart
        this.parentElem.addEventListener("click", this)
    }

    handleEvent(event){
        if(event.type === "click"){
            this.addToCart(event)
        }
    }

    addToCart(event) {
        const element = event.target
        if(element.dataset.type === "addToCartButton") {
            const productId = element.closest("li").dataset.id
            const product = this.productList.find(product => {
                return product.id === productId
            })
            this.cart.addToCart(product)
        } 
    }

}
