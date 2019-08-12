const goodsBtn = document.querySelectorAll('.goods__btn'),
products = document.querySelectorAll('.goods__item'),
cart = document.querySelector(".cart"),
cartWrapper = cart.querySelector(".modal__window__wrapper");




goodsBtn.forEach(function (btn, i) {
btn.addEventListener('click', function (e) {
    item = products[parseInt(i / 2)].cloneNode(true);
    let priceWraper = item.querySelector('.goods__price__wrapper'),
        removeBtn = document.createElement("button"),
        empty = cartWrapper.querySelector('.empty'),
        price = document.createElement("div");
    priceValue = +this.querySelector("span").innerHTML;
    price.classList.add("goods__price");
    price.innerHTML = `<span>${priceValue} грн</span>`

    item.appendChild(price);
    priceWraper.remove();
    showConfirm();

    removeBtn.classList.add('goods__item-remove');
    removeBtn.innerHTML = '&times';
    item.appendChild(removeBtn);

    cartWrapper.appendChild(item);
    removeFromCart();

    if (empty) {
        empty.style.display = "none";
    }
    calcTotal();
    calcGoods();
});
});