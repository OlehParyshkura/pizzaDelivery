const modalWindows = document.querySelectorAll('.modal__window');

modalWindows.forEach((modalWindow) => {
    const close = modalWindow.querySelector(".modal__window__close"),
        dataFor = modalWindow.getAttribute("data-for"),
        open = document.querySelector(dataFor);
    close.addEventListener("click", () => {
        modalWindow.style.display = "none";
        document.body.style.overflow = '';
        open.focus();
    });
    open.addEventListener("click", () => {
        modalWindow.style.display = "grid";
        document.body.style.overflow = "hidden";
        close.focus();
    });

});