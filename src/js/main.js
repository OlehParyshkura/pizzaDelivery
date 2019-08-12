let goodsmemo;
let goodsForViev;
let pageOpened = 0;
const goodsPerPage = 10
const prevButton = document.querySelector(".prev__button");
const nextButton = document.querySelector(".next__button")
const loadContent = async (url, callback) => {
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            goodsmemo = json.goods;
            goodsForViev = json.goods;
            createElement(json.goods);
        });
    callback();
}

function createElement(arr) {
    let firstIndex = pageOpened * goodsPerPage;
    while (arr[firstIndex] == undefined && pageOpened != 0) {
        pageOpened--;
        firstIndex = pageOpened * goodsPerPage;
    }
    prevButton.disabled = pageOpened == 0 ? true : false;
    nextButton.disabled = arr[firstIndex + goodsPerPage] == undefined ? true : false;
    const goodsWrapper = document.querySelector('.goods__wrapper');
    goodsWrapper.innerHTML = "";
    let goodsArr = arr.slice(pageOpened * goodsPerPage, pageOpened * goodsPerPage + goodsPerPage);
    //= partials/addGoodsCards.js

    //= partials/goodsButtons.js

    //= partials/confirm.js

    //= partials/cartCalc.js
}

loadContent('json/db.json', () => {
    //= partials/menuToggle.js

    //= partials/prevNextBtns.js

    //= partials/modalWindow.js

    //= partials/clearCart.js

    //= partials/sortFilter.js
});