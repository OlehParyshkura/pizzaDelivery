const totalCost = document.querySelector('.cart__total > span'),
    badge = document.querySelector('.nav__badge');

function calcGoods() {
    const items = cartWrapper.querySelectorAll('.goods__item');
    badge.textContent = items.length;
}

function calcTotal() {
    let prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
    let total = 0;
    total = [...prices]
        .map((a) => +a.textContent)
        .reduce((a, b) => a + b, 0);
    /*prices.forEach(function (item) {
        total += +item.textContent;
    });*/
    totalCost.textContent = total;
}

function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    empty = cartWrapper.querySelector('.empty');
    removeBtn.forEach(function (btn) {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            calcGoods();
            calcTotal();
            if (!cartWrapper.querySelector('.goods__item-remove')) {
                empty.style.display = "block";
            }
        });
    });
}