export class Filter {

    static filterBySection(productList, clickedSection) {
        if(clickedSection === "Todos") {
            return productList;
        } else {
            const filteredProducts = productList.filter((data) => data["categoria"].toLowerCase() === clickedSection.toLowerCase());
            return filteredProducts;
        }
    }

    static filterByInput(productList, inputValue) {
        const searchInput  = inputValue.toLowerCase();

        const filteredProducts = productList.filter((data) => {
            if (data["nome"].toLowerCase().includes(searchInput) ||
                data["categoria"].toLowerCase().includes(searchInput )) {

                return true;
            }
        });

        return filteredProducts;
    }
}

