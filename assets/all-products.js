class AllProducts extends HTMLElement {
    index = 0;

    constructor() {
        super();
        this.loadMoreButton = this.querySelector('button');
        this.productsPerRow = Number.parseInt(document.querySelector('.page-width.custom').dataset.productsPerRow);
        this.remainingProducts = document.querySelector('.page-width.custom').dataset.remainingProducts.split(',');
        this.grid = this.querySelector('.grid');

        this.loadMoreButton.addEventListener('click', this.loadMoreProducts.bind(this));
    }

    async loadMoreProducts(){
        this.loadMoreButton.disabled = true;
        const productsToLoad = this.remainingProducts.slice(this.index, this.index + this.productsPerRow);

        const products = await Promise.all(
            productsToLoad.map(async (productHandle) => {
                const response = await fetch(`/products/${productHandle}?sections=card-product`);
                const data = await response.json();
                return data['card-product'];
            })
        );

        products.forEach(product => {
            this.grid.innerHTML += product;
        });

        this.index += this.productsPerRow;

        if (this.index >= this.remainingProducts.length) {
            this.loadMoreButton.remove();
        } else{
            this.loadMoreButton.disabled = false;
        }
    }
}

customElements.define('all-products', AllProducts);