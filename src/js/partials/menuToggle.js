const menuToggle = document.querySelector(".menu-toggle"),
goods = document.querySelector(".goods");
    menuToggle.addEventListener("click", () => {
        goods.classList.toggle("menu__hidden");
    });