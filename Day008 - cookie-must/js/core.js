const ghostButton = document.querySelector('.btn-ghost');
const buttons = document.querySelector('.buttons');

ghostButton.addEventListener('mouseover', () => {
    let direction = buttons.style.flexDirection;
    console.log("direction: ", direction)
    if (direction === 'row') {
        buttons.style.flexDirection = "row-reverse";
    } else {
        buttons.style.flexDirection = "row";
    }
});