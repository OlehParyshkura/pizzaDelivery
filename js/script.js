
let goodsmemo;
let goodsForViev;
let pageOpened = 0;
const loadContent = async (url, callback) => {
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            goodsmemo = json.goods;
            goodsForViev = json.goods;
            createElement(json.goods);
            console.log(goodsmemo.length);
        });
    callback();
}

function createElement(arr) {
    if(pageOpened < 0){
        pageOpened = 0;
        return;
    }

        while(arr[pageOpened*10]===undefined&&pageOpened!==0){
        pageOpened--;}
        
    
    console.log("PO" + pageOpened);
    const goodsWrapper = document.querySelector('.goods__wrapper');
    goodsWrapper.innerHTML = "";

    let arr2=arr.slice(pageOpened*10,pageOpened*10+10);
    arr2.forEach(function (item){
        let card = document.createElement('div');
        card.classList.add('goods__item');
        card.innerHTML = `
            <div class="goods__title">
                <span> ${item.title}</span>
            </div>
            <div class="goods__ingredients" title="${item.ingredients.join("\n")}"><span>
            інгредієнти(і)</span></div>
            <div class="goods__img__wrapper"><img class="goods__img" src="${item.url}" alt="pizza"></div>
            <div class="goods__price__wrapper">
            <div class="goods__diameter"><span>30см</span></div><div class="goods__diameter"><span>40см</span></div>
            <button class="goods__btn"> <span>${item.price[0]}</span> грн</button>
            <button class="goods__btn"> <span>${item.price[1]}</span> грн</button>
            </div>
            `;
        goodsWrapper.appendChild(card);
    });
    let goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        totalCost = document.querySelector('.cart__total > span'),
        cartWrapper = document.querySelector('.cart__wrapper'),
        badge = document.querySelector('.nav__badge'),
        confirm = document.querySelector('.confirm');

    goodsBtn.forEach(function (btn, i) {
        btn.addEventListener('click', function (e) {
            item = products[parseInt(i/2)].cloneNode(true);
            let priceWraper = item.querySelector('.goods__price__wrapper'),
                removeBtn = document.createElement("button"),
                empty = cartWrapper.querySelector('.empty'),
                price = document.createElement("div");
            priceValue = +this.querySelector("span").innerHTML;
            price.classList.add("goods__price");
            price.innerHTML = `<span>${priceValue}</span> грн`

            item.appendChild(price);
            priceWraper.remove();
            showConfirm();

            removeBtn.classList.add('goods__item-remove');
            //removeBtn.setAttribute("tabindex",2);
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
    let showConfirmCounter = 100;
    function showConfirm() {
        confirm.style.display = 'block';
        showConfirmCounter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if (showConfirmCounter == 10) {
                clearInterval(id);
                confirm.style = 'none';
            } else {
                showConfirmCounter--;
                confirm.style.transform = `translateY(-${+showConfirmCounter}px)`;
                confirm.style.opacity = '.' + showConfirmCounter;
            }
        }
    }

    function calcGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
    }

    function calcTotal() {
        let prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        console.log(typeof(prices));
        total = [...prices]
                .map((a)=> +a.textContent)
                .reduce((a,b)=>a+b,0);
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
}

loadContent('js/db.json', () => {

    const cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        sortFilter = document.querySelector(".goods__filter > div > form"),
        nextButton = document.querySelector(".next__button"),
        prevButton = document.querySelector(".prev__button"),
        menuToggle = document.querySelector(".menu-toggle")
        goods=document.querySelector(".goods");

        menuToggle.addEventListener("click",()=>{
            goods.classList.toggle("menu__hidden");
            sortFilter.attributes.toggle("tabindex");
        })
    

    prevButton.addEventListener("click", () => {

        console.log("p");
        pageOpened--;
        createElement(goodsForViev);
    });
    nextButton.addEventListener("click", function (e) {
        pageOpened++;
        console.log("n");
        createElement(goodsForViev);
    });

    function openCart() {
        cart.style.display = "grid";
        document.body.style.overflow = "hidden";
        if(cart.querySelector(".goods__item > .goods__item-remove")){
            cart.querySelector(".goods__item > .goods__item-remove").focus();
        }
        else{
            cart.querySelector(".cart__close").focus();
        }
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
        open.focus()
    }
    for (let i = 0, n = sortFilter.elements.length; i < n; i++) {
        sortFilter.elements[i].addEventListener("input", SortFilterHandler.bind(sortFilter));
    }

    function SortFilterHandler(e) {
        const start= new Date().getTime();
        let g = [...goodsmemo];
        const form = this,
            search = form.querySelector(".search"),
            priceSort = form.querySelector("#price_sort"),
            withoutMoshrooms = form.querySelector("#withoutMushrooms"),
            withoutOnion = form.querySelector("#withoutOnion"),
            withoutOlives = form.querySelector("#withoutOlives"),
            withoutMustard = form.querySelector("#withoutMustard");
        console.log(priceSort.selectedIndex);
        if (priceSort.selectedIndex != 0) {
            g.sort((a, b) => {
                return +a.price[0] > +b.price[0] ? 1 : -1
            });

            if (priceSort.options[priceSort.selectedIndex].id == "expensiveFirst") {
                g.reverse();
            }
        }
        let searchVal=search.value.trim()
        if(searchVal!=''){
            g=g.filter(el=>{
                let flag = false;
                //console.log(el);
                for (key in el){
                   // console.log(key);
                    if(el[key] instanceof Array){
                        el[key].forEach(el=>{
                            if(el.toLowerCase().includes(searchVal.toLowerCase())) 
                                flag=true;})
                    }
                    else if(el[key].toLowerCase().includes(searchVal.toLowerCase())){
                        flag=true;
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
    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

});