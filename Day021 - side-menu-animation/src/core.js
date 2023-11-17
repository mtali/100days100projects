window.addEventListener('load', () => {
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('menu');
    const content = document.getElementById('content');

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });
});