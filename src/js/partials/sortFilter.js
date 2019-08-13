const sortFilter = document.querySelector(".goods__filter > div > form");
for (let i = 0, n = sortFilter.elements.length; i < n; i++) {
    sortFilter.elements[i].addEventListener("input", SortFilterHandler.bind(sortFilter));
}

function SortFilterHandler(e) {
    let goods = [...goodsmemo];
    const form = this,
        search = form.querySelector(".search"),
        priceSort = form.querySelector("#price_sort"),
        withoutMoshrooms = form.querySelector("#withoutMushrooms"),
        withoutOnion = form.querySelector("#withoutOnion"),
        withoutOlives = form.querySelector("#withoutOlives"),
        withoutMustard = form.querySelector("#withoutMustard");
    if (priceSort.options[priceSort.selectedIndex].id == "cheapFirst") {
        goods.sort((a, b) => {
            return +a.price[0] - +b.price[0];
        });
    } else if (priceSort.options[priceSort.selectedIndex].id == "expensiveFirst") {
        goods.sort((a, b) => {
            return +b.price[1] - +a.price[1];
        });
    }

    let searchVal = search.value.trim()
    if (searchVal != '') {
        goods = goods.filter(el => {
            let flag = false;
            for (key in el) {
                if (el[key] instanceof Array) {
                    el[key].forEach(el => {
                        if (el.toLowerCase().includes(searchVal.toLowerCase()))
                            flag = true;
                    })
                } else if (el[key].toLowerCase().includes(searchVal.toLowerCase())) {
                    flag = true;
                }

            }
            return flag;
        })
    }
    if (withoutMoshrooms.checked) {
        goods = goods.filter(el => !el.ingredients.includes("печериці"));
    }
    if (withoutOnion.checked) {
        goods = goods.filter(el => !el.ingredients.includes("цибуля синя"));
    }
    if (withoutOlives.checked) {
        goods = goods.filter(el => !el.ingredients.includes("маслини"));
    }
    if (withoutMustard.checked) {
        goods = goods.filter(el => !el.ingredients.includes("соус гірчичний"));
    }
    goodsForViev = goods;
    createElement(goods, pageOpened);
}