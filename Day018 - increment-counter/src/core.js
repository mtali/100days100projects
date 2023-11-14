const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = 0;

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +(counter.innerText).replace(/,/g, '');
        const increment = target / 1000;
        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment).toLocaleString()}`;
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    }

    document.addEventListener('click', () => {
        updateCounter();
    })

});