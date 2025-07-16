class BuyTogether extends HTMLElement {
    constructor() {
        super();
        this.productsSelecteds = [];
        this.quantityProductsSelected = [];
        this.buyContainer = this.querySelector('.buy-items-container');

        this.handleQuantityButton();
    }

    handleQuantityButton(){
        const quantityButtons = this.querySelectorAll('.qty-input');

        quantityButtons.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                this.quantityProductsSelected[index] = parseInt(event.target.value);

                const url = `${window.location.pathname}?section_id=${this.getSectionsToRender()[0].id}`;
                this.buyContainer.setAttribute('total-quantity', this.quantityProductsSelected.reduce((a, b) => a + b, 0));
                
                //console.log("teste", document.querySelector('#quantity-display'))
                //document.querySelector('#quantity-display').textContent = `(${this.quantityProductsSelected.reduce((a, b) => a + b, 0)})`;

                fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            });
        });
    }

    getSectionsToRender() {
        return [
          {
            id: 'buy-items-container',
            selector: '#buy-items-container',
          },
        ];
    }
  }


  
  customElements.define("buy-together", BuyTogether);
  