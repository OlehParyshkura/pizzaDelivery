const confirm = document.querySelector('.confirm');
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