const password = document.querySelector('#password');
const passwordLength = document.querySelector('#password-length');
const includeUpper = document.querySelector('#include-upper');
const includeLower = document.querySelector('#include-lower');
const includeNumbers = document.querySelector('#include-numbers');
const includeSymbols = document.querySelector('#include-symbols');
const generate = document.querySelector('#generate')


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


generate.addEventListener('click', event => {
    const length = +passwordLength.value;
    const lower = includeLower.checked;
    const upper = includeUpper.checked;
    const number = includeNumbers.checked;
    const symbol = includeSymbols.checked;

    password.value = generatePassword(lower, upper, number, symbol, length);

});


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const functionName = Object.keys(type)[0];
            generatedPassword += randomFunction[functionName]();
        })
    }
    return generatedPassword.slice(0, length);
}






