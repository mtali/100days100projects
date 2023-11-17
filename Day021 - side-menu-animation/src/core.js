window.addEventListener('load', () => {
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('menu');
    const content = document.getElementById('content');
    const languages = document.querySelectorAll('.language li');


    languages.forEach(element => {
        element.addEventListener('mouseover', e => {
            e.target.classList.add('activated');
        })
        element.addEventListener('mouseout', e => {
            e.target.classList.remove('activated');
        })
    });

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });
});