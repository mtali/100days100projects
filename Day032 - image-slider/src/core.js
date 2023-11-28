window.addEventListener('load', () => {
    const nextEl = document.querySelector('.next');
    const prevEl = document.querySelector('.prev');
    const imagesEl = document.querySelectorAll('img');
    const imageContainerEl = document.querySelector('.image-slider');

    let currentImage = 1;

    let timeout;

    nextEl.addEventListener('click', () => {
       currentImage++;
       clearTimeout(timeout);
       updateImage();
    });

    prevEl.addEventListener('click', () => {
        currentImage--;
        clearTimeout(timeout);
        updateImage();
    });

    updateImage();

    function updateImage() {
        if (currentImage > imagesEl.length) {
            currentImage = 1
        } else if (currentImage < 1) {
            currentImage = imagesEl.length;
        }
        imageContainerEl.style.transform = `translateX(-${(currentImage - 1) * 500}px)`;
        timeout = setTimeout(() => {
            currentImage++;
            updateImage()
        }, 2000)
    }
});
