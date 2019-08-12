const nextButton = document.querySelector(".next__button"),
    prevButton = document.querySelector(".prev__button");
prevButton.addEventListener("click", () => {
    nextButton.disabled = false;
    pageOpened--;
    if (pageOpened == 0) {
        prevButton.disabled = true;
    }
    createElement(goodsForViev);
});
nextButton.addEventListener("click", function (e) {
    if (pageOpened > 0) {
        prevButton.disabled = false;
    }

    pageOpened++;
    createElement(goodsForViev);
});