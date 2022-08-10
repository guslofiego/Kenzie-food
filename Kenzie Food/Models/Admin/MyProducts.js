import { AdminInfo } from "../../Controller/Admin/Admin.js";

export class MyProduct{

    static productId = ""

    static showMyProducts(parentElem, productList){  
        parentElem.innerHTML = "";
        

        productList.forEach(product => {
            const li = document.createElement("li")
            li.classList.add("myProduct")
            li.dataset.productId = product.id

            const img = document.createElement("img")
            img.classList.add("foodImage")
            img.src = product.imagem

            const divName = document.createElement("div")
            divName.classList.add("productNameContainer")
            const pName = document.createElement("p")
            pName.classList.add("productName")
            pName.innerText = product.nome
            divName.appendChild(pName)
            
            const ulCategory = document.createElement("ul")
            ulCategory.classList.add("categoriesList")
            const liCategory = document.createElement("li")
            liCategory.classList.add("myProductCategory")
            liCategory.innerText = product.categoria
            ulCategory.appendChild(liCategory)

            const divDescription = document.createElement("div")
            divDescription.classList.add("myProductDescriptionContainer")
            const pDescription = document.createElement("p")
            pDescription.classList.add("myProductDescription")
            pDescription.innerText = product.descricao
            divDescription.appendChild(pDescription)
            
            const divIcons = document.createElement("div")
            divIcons.classList.add("iconsContainer")

            const divEditIcons = document.createElement("div")
            divEditIcons.classList.add("myProductIconsContainer")
            const imgEditIcons = document.createElement("img")
            imgEditIcons.classList.add("myProductIcons")
            imgEditIcons.src = "data:image/png;base64,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"
            divEditIcons.appendChild(imgEditIcons)
            divEditIcons.addEventListener("click", MyProduct.showEditMenu)

            const divRemoveIcons = document.createElement("div")
            divRemoveIcons.classList.add("myProductIconsContainer")
            const imgRemoveIcons = document.createElement("img")
            imgRemoveIcons.classList.add("myProductIcons")
            imgRemoveIcons.src = "https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-cone-da-lixeira-plana.png"
            divRemoveIcons.appendChild(imgRemoveIcons)
            divRemoveIcons.addEventListener("click", MyProduct.showRemoveOption)

            divIcons.append(divEditIcons,divRemoveIcons)

            li.append(img,divName,ulCategory,divDescription,divIcons)

            parentElem.appendChild(li)
        })

    }

    static showCreateMenu() {
        const inputs = document.querySelectorAll(".inputNewProduct");
        inputs.forEach((input) => {
            input.value = ""
        })
        
        const categoryOptions = document.querySelectorAll(".productCategoryOption");
        categoryOptions.forEach((option)=>{
            option.classList.remove("productCategoryOptionSelect");
        })
        const backgroudOpacity = document.querySelector(".backgroudOpacity");
        const menuEditMyProduct = document.getElementById("menuNewMyProduct");
        backgroudOpacity.classList.remove("hidden");
        menuEditMyProduct.classList.remove("hidden");
        
    }

    static createMyProduct() { 
        
        const inputs = document.querySelectorAll(".inputNewProduct");
        const category = document.querySelector(".productCategoryOptionSelect");
        const changes = {};
        changes["nome"] = inputs[0].value;
        changes["preco"] = inputs[2].value;
        changes["descricao"] = inputs[1].value;
        changes["imagem"] = inputs[3].value;
        if(category === null) {
            changes["categoria"] = "";
        } else {
            changes["categoria"] = category.innerText;
        }
        
        return changes;
    }

    static showEditMenu(event) { 
        const inputs = document.querySelectorAll(".inputEditProduct");
        MyProduct.productId = event.target.closest("li").dataset.productId;
        let editProduct = {};
        AdminInfo.getMyProductList().then((prod)=> {
            prod.forEach((product) => {
                if(product["id"] === MyProduct.productId) {
                    editProduct = product;
                }
            })
        })
        .then(() => {
            inputs.forEach((input) => {
                input.value = editProduct[input.name]
            })
            const categoryOptions = document.querySelectorAll(".editCategory");
            categoryOptions.forEach((option)=>{
                option.classList.remove("productCategoryOptionSelect");
                if(option.innerText === editProduct["categoria"]){
                    option.classList.add("productCategoryOptionSelect");
                }
            })
            const backgroudOpacity = document.querySelector(".backgroudOpacity");
            const menuEditMyProduct = document.getElementById("menuEditMyProduct");
            backgroudOpacity.classList.remove("hidden");
            menuEditMyProduct.classList.remove("hidden");
        })
    }

    static editMyProduct() { 
        const inputs = document.querySelectorAll(".inputEditProduct");
        const category = document.querySelector(".productCategoryOptionSelect");
        const changes = {};
        changes["categoria"] = "";
        changes["nome"] = inputs[0].value;
        changes["preco"] = inputs[2].value;
        changes["categoria"] = category.innerText;
        changes["descricao"] = inputs[1].value;
        changes["imagem"] = inputs[3].value;

        return changes;
    }
    

    static showRemoveOption() {
        const menuDeleteMyProduct = document.getElementById("menuDeleteMyProduct");
        const backgroudOpacity = document.querySelector(".backgroudOpacity");
        backgroudOpacity.classList.remove("hidden");
        menuDeleteMyProduct.classList.remove("hidden");
        MyProduct.productId = event.target.closest("li").dataset.productId;
    }

    static showRemoveOptionEdit(event) {
        const menuDeleteMyProduct = document.getElementById("menuDeleteMyProduct");
        menuDeleteMyProduct.classList.remove("hidden");
        const menuEditMyProduct = document.getElementById("menuEditMyProduct");
        menuEditMyProduct.classList.add("hidden");
    }

    static removeProduct() { 


    }

    static showLogoutMenu() {
        const menuLogout = document.getElementById("toggleLogout");
        menuLogout.classList.remove("hidden");
    }

    static closeCreateMenu() {
        const backgroudOpacity = document.querySelector(".backgroudOpacity");
        const menuNewMyProduct = document.getElementById("menuNewMyProduct");
        backgroudOpacity.classList.add("hidden");
        menuNewMyProduct.classList.add("hidden");
    }

    static closeEditMenu() {
        const backgroudOpacity = document.querySelector(".backgroudOpacity");
        const menuEditMyProduct = document.getElementById("menuEditMyProduct");
        backgroudOpacity.classList.add("hidden");
        menuEditMyProduct.classList.add("hidden");
    }

    static closeDeleteMenu() {
        const menuDeleteMyProduct = document.getElementById("menuDeleteMyProduct");
        const backgroudOpacity = document.querySelector(".backgroudOpacity");
        backgroudOpacity.classList.add("hidden");
        menuDeleteMyProduct.classList.add("hidden");
    }

    static closeLogoutMenu() {
        const menuLogout = document.getElementById("toggleLogout");
        menuLogout.classList.add("hidden");
    }

    static closeStatusError() {
        const statusError = document.getElementById("statusError");
        statusError.classList.add("hidden");
    }

    static closeStatusSucess() {
        const statusSucess = document.getElementById("statusSucess");
        statusSucess.classList.add("hidden");
    }
}
