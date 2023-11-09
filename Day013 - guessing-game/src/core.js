window.addEventListener('load', () => {
    let health = 10;
    let randomNumber = getRandomNumber();
    const healthSpan = document.getElementById('health');
    const form = document.getElementById('form');
    const number = document.getElementById('number');
    const plusBtn = document.getElementById('plusBtn');
    const minusBtn = document.getElementById('minusBtn');
    const message = document.getElementById('message');
    let timeoutId;
    setHealth();


    form.addEventListener('submit', event => {
        const num = Number(number.value);
        if (health > 0) {
            if (num === randomNumber) {
                updateMessage("You won");
            } else if (num > randomNumber) {
                updateMessage("Try less!");
                decreaseHealth();
            } else {
                updateMessage("Try greater!")
                decreaseHealth()
            }
            event.preventDefault();
        } else {
            updateMessage("You lost 😭 ")
        }

        setHealth();
    });

    plusBtn.addEventListener('click', () => plus());
    minusBtn.addEventListener('click', () => minus());


    function updateMessage(msg) {
        message.textContent = msg;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            message.textContent = "Waiting ..."
        }, 1500)

    }


    function getRandomNumber() {
        return Math.floor(Math.random() * 100)
    }

    function setHealth() {
        healthSpan.textContent = `${health}`;
    }

    function decreaseHealth() {
        if (health > 0) health--;
    }

    function plus() {
        let num = Number(number.value);
        if (num < 100) number.value = num + 1;
    }

    function minus() {
        let num = Number(number.value);
        if (num > 0) number.value = num - 1;

    }

});