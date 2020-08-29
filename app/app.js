import quotes from './quotes.js';

const quoteText = document.querySelector('blockquote > h1');
const author = document.querySelector('blockquote > p');
const langBtns = document.querySelectorAll('#lang-change > li');

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuote() {
    const randomQuoteIndex = quotes[randomInt(0, quotes.length - 1)];
    quoteText.innerHTML = randomQuoteIndex.ita;
}

window.addEventListener('load', randomQuote);

langBtns.forEach(btn => btn.addEventListener('click', () => {
    btn.classList.add('active');
}));

console.log(Object.entries(langBtns));