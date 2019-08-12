const //cart = document.querySelector('.cart'),
    //cartClose = document.querySelector('.cart__close'),
    //cartOpen = document.querySelector('#cart'),
    cartClear = document.querySelector(".cart__clear"),
    totalCost = document.querySelector('.cart__total > span'),
    cart = document.querySelector(".cart"),
    cartWrapper = cart.querySelector(".modal__window__wrapper"),
    empty = cartWrapper.querySelector('.empty'),
    badge = document.querySelector('.nav__badge');

function clearCart(event) {
    event.stopPropagation();
    const cartItems = cartWrapper.querySelectorAll(".goods__item");
    console.log("clearcart");
    cartItems.forEach((el) => {
        el.remove();
    });
    totalCost.textContent = "0";
    badge.textContent = "0";
    empty.style.display = "block";
}

cartClear.addEventListener("click", clearCart);