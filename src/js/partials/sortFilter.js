const sortFilter = document.querySelector(".goods__filter > div > form");
for (let i = 0, n = sortFilter.elements.length; i < n; i++) {
    sortFilter.elements[i].addEventListener("input", SortFilterHandler.bind(sortFilter));
}

function SortFilterHandler(e) {
    const start = new Date().getTime();
    let g = [...goodsmemo];
    const form = this,
        search = form.querySelector(".search"),
        priceSort = form.querySelector("#price_sort"),
        withoutMoshrooms = form.querySelector("#withoutMushrooms"),
        withoutOnion = form.querySelector("#withoutOnion"),
        withoutOlives = form.querySelector("#withoutOlives"),
        withoutMustard = form.querySelector("#withoutMustard");
    if (priceSort.options[priceSort.selectedIndex].id == "cheapFirst") {
        g.sort((a, b) => {
            return +a.price[0] > +b.price[0] ? 1 : -1
        });
    } else if (priceSort.options[priceSort.selectedIndex].id == "expensiveFirst") {
        g.sort((a, b) => {
            return +a.price[1] < +b.price[1] ? 1 : -1
        });
    }

    let searchVal = search.value.trim()
    if (searchVal != '') {
        g = g.filter(el => {
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
        g = g.filter(el => !el.ingredients.includes("печериці"));
    }
    if (withoutOnion.checked) {
        g = g.filter(el => !el.ingredients.includes("цибуля синя"));
    }
    if (withoutOlives.checked) {
        g = g.filter(el => !el.ingredients.includes("маслини"));
    }
    if (withoutMustard.checked) {
        g = g.filter(el => !el.ingredients.includes("соус гірчичний"));
    }
    goodsForViev = g;
    console.log(g);
    createElement(g, pageOpened);
    const end = new Date().getTime();
    console.log(`${end - start}ms`);
}