window.addEventListener('load', () => {
    const ratingEls = document.querySelectorAll(".rating");
    const btnEl = document.querySelector('.btn');
    const containerEl = document.getElementById('container');

    let selectedRating = "";

    ratingEls.forEach((ratingEl) => {
        ratingEl.addEventListener("click", (event) => {
            removeActive();
            selectedRating =
                event.target.innerText || event.target.parentNode.innerText;
            console.log(event.target.classList)
            event.target.classList.add("active");
            event.target.parentNode.classList.add("active");
        });
    });

    btnEl.addEventListener("click", () => {
        if (selectedRating !== "") {
            containerEl.innerHTML = `
        <strong>Thank you!</strong>
        <br>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>Your input is extremely useful. Thanks!</p>
        `;
        }
    });

    function removeActive() {
        ratingEls.forEach(rating => {
            rating.classList.remove('active');
        });
    }
});

