const good = document.getElementById('good');
const cheap = document.getElementById('cheap');
const fast = document.getElementById('fast');
const toggles = document.querySelectorAll('.toggle');

toggles.forEach(element => {
    element.addEventListener('change', e => {
        compute(e.target);
    });
});

function compute(clicked) {
    if (good.checked && cheap.checked && fast.checked) {
        if (good === clicked) {
            fast.checked = false;
        }

        if (cheap === clicked) {
            fast.checked = false;
        }

        if (fast === clicked) {
            cheap.checked = false;
        }
    }
}