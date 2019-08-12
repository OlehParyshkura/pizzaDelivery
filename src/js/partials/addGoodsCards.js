goodsArr.forEach(function (item) {
    let card = document.createElement('div');
    card.classList.add('goods__item');
    card.innerHTML = `
        <div class="goods__title">
            <span> ${item.title}</span>
        </div>
        <div class="goods__img__wrapper" data-title=" ${item.ingredients.join(", ")}"><img class="goods__img" src="${item.url}" alt="pizza"></div>
        <div class="goods__price__wrapper">
        <div class="goods__diameter"><span>&#8960;30см</span></div><div class="goods__diameter"><span>&#8960;40см</span></div>
        <button class="goods__btn"> <span>${item.price[0]}</span> грн</button>
        <button class="goods__btn"> <span>${item.price[1]}</span> грн</button>
        </div>
        `;
    goodsWrapper.appendChild(card);
});