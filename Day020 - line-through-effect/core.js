const text = document.getElementById('text')

const textArr = text.innerText.split('');

const newElement = document.createElement('h1');

newElement.innerHTML = `
	${textArr.map(letter => `<span class="letter" style="${randomVisibility()}">${letter}</span>`).join('')}
`;


newElement.classList.add('overlay');

document.body.appendChild(newElement);

function randomVisibility() {
    return Math.random() < 0.5 ? 'visibility: hidden' : 'visibility: visible';
}