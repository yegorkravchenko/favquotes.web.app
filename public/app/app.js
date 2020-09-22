import quotes from './quotes.js';

const quoteText = document.querySelector('blockquote > h1');
const author = document.querySelector('blockquote > p');
const langBtns = document.querySelectorAll('#lang-change > li');
const reloadIcon = document.querySelector('i');

if (sessionStorage.getItem('language') === null) {
    sessionStorage.setItem('language', 'ita');
}

// prevent consequent displaying of the same quote
let randomNum = randomInt(0, quotes.length - 1);

// TODO: prevent consequent displaying of the same quote

let randomQuoteIndex = quotes[randomNum];

// Random integer in a range
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Change quote according to the selected language
function setQuote() {
    switch (sessionStorage.getItem('language')) {
        case 'ita':
            quoteText.innerHTML = addSpan(randomQuoteIndex.ita, randomQuoteIndex.underlinedIta);
            author.textContent = randomQuoteIndex.authorIta;
            break;
        case 'eng':
            quoteText.innerHTML = addSpan(randomQuoteIndex.eng, randomQuoteIndex.underlinedEng);
            author.textContent = randomQuoteIndex.authorEng;
            break;
        case 'rus':
            quoteText.innerHTML = addSpan(randomQuoteIndex.rus, randomQuoteIndex.underlinedRus);
            author.textContent = randomQuoteIndex.authorRus;
            break;
    }
}

// Change the page title according to the selected language
function setTitle() {
    switch (sessionStorage.getItem('language')) {
        case 'ita':
            document.title = 'FavQuotes: citazioni random';
            break;
        case 'eng':
            document.title = 'FavQuotes: random quotes';
            break;
        case 'rus':
            document.title = 'FavQuotes: случайные цитаты';
            break;
    }
}

// Reload icon animation
function reloadIconAnimation() {
    const rotate360 = [
        { transform: 'rotate(0deg)'},
        { transform: 'rotate(360deg)' }
    ];
    
    reloadIcon.animate(rotate360, { duration: 350 });
}

// Adds span with underlined class to selected words in a quote
function addSpan(string, wordsArr) {
    wordsArr.forEach(word => {
        const regEx = new RegExp(word, 'g');
        string = string.replace(regEx, `<span class="underlined">${string.match(regEx)[0]}</span>`);
    });
    return string;
}

// Change active language buttons
langBtns.forEach(btn => btn.addEventListener('click', () => {
    let activeLang = Object.values(langBtns).filter(item => item.classList.contains('active'))[0];
    activeLang.classList.remove('active');
    
    btn.classList.add('active');
    sessionStorage.setItem('language', btn.textContent.toLowerCase());

    setQuote();
    setTitle();
}));

// Reload page by clicking reload icon
reloadIcon.addEventListener('click', () => {
    reloadIconAnimation();
    location.reload();
});

// Change quote on each page load and reload
// Set active language button chosen before the reload
window.addEventListener('load', () => {
    setQuote();
    setTitle();
    reloadIconAnimation();

    let activeLang = Object.values(langBtns).filter(item => item.textContent.toLowerCase() === sessionStorage.getItem('language'))[0];
    activeLang.classList.add('active');
});