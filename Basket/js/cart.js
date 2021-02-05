const productBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
let cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};



const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};
const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`;
}
const printQuantity = () => {
    let length = cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active');    
}
const generateCartProduct = (img, title, price, id) => {
    return `
        <li class="cart-content__item">
                <article class="cart-content__product cart-product" data-id="${id}">
                    <img src="${img}" alt="Макбук" class="cart-product__img">
                    <div class="cart-product__text">
                        <h3 class="cart-product__title">${title}</h3>
                        <span class="cart-product__price">${normalPrice(price)} ₽</span>
                    </div>
                    <button class="cart-product__delete" aria-label="Удалить товар"></button>
                </article>
        </li>`
        ;
}
const deleteProducts = (productParent) => {
    console.log(productParent);
     //get the id
     let id = productParent.querySelector('.cart-product').dataset.id;
     // disabled false
     document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
     //minus price
     let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
     minusFullPrice(currentPrice);
    //print fullprice
     printFullPrice();
     //remove productParent
     productParent.remove();
     //count and print quantity
     printQuantity();
}
productBtn.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.product');
        let id = parent.dataset.id;
        let img = parent.querySelector('.image-switch__img img').getAttribute('src');
        let title = parent.querySelector('.product__title').textContent;
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));

        plusFullPrice(priceNumber);
        console.log(price);
        printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
        printQuantity();

        self.disabled = true;

    });
});

cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product__delete')) {
        deleteProducts(e.target.closest('.cart-content__item'));
    }
});