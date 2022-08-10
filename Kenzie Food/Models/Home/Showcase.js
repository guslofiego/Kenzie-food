const mainContent = document.querySelector('.main_content_products');
export class Showcase {
    constructor(parentElem, productList) {
        this.parentElem = parentElem;
        this.productList = productList;
    }

    listarProdutos() {
        this.parentElem.innerHTML = "";

        this.productList.forEach((data) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const p = document.createElement("p");
            p.classList.add("product_description");
            const p2 = document.createElement("p");
            p2.classList.add("product_category");
            const divCategory = document.createElement("div");
            divCategory.classList.add("product_category_conteiner");
            const divPrice = document.createElement("div");
            divPrice.classList.add("product_price_img");
            const p3 = document.createElement("p");
            p3.classList.add("product_price");
            const button = document.createElement("button");
            button.classList.add("addToCart_button");
            const img2 = document.createElement("img");


            li.dataset.id = data["id"];
            li.classList.add("main_products_li_conteiner")

            img.src = data["imagem"];
            img.classList.add("main_product_image")
            img.alt = data["nome"];
            img2.src = "../Images/Home/green_cart.png";
            img2.alt = data["nome"];
            img2.dataset.type = "addToCartButton"
            button.dataset.type = "addToCartButton"

            h2.innerText = data["nome"];

            p.innerText = data["descricao"];
            p2.innerText = data["categoria"];

            const precoDoProduto = data["preco"];
            p3.innerText = precoDoProduto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            });

            mainContent.append(li)
            button.appendChild(img2)
            divCategory.appendChild(p2)
            divPrice.append(p3,button)
            li.append(img, h2, p, divCategory,  divPrice);

            this.parentElem.appendChild(li);
        });
    }
}
