const checkbox = document.getElementById('checkbox');
const container = document.querySelector('.container');

checkbox.addEventListener('change', () => {
    container.classList.toggle('dark');
});
