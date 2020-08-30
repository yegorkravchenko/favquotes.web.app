import quotes from './quotes.js';

const quoteText = document.querySelector('blockquote > h1');
const author = document.querySelector('blockquote > p');
const langBtns = document.querySelectorAll('#lang-change > li');
const reloadIcon = document.querySelector('i');

if (sessionStorage.getItem('language') === null) {
    sessionStorage.setItem('language', 'ita')
}

const randomQuoteIndex = quotes[randomInt(0, quotes.length - 1)];

// Random integer in a range
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set or change quote according to the selected language
function setQuote() {
    switch (sessionStorage.getItem('language')) {
        case 'ita':
            quoteText.innerHTML = randomQuoteIndex.ita;
            author.textContent = randomQuoteIndex.authorIta;
            break;
        case 'eng':
            quoteText.innerHTML = randomQuoteIndex.eng;
            author.textContent = randomQuoteIndex.authorEng;
            break;
        case 'rus':
            quoteText.innerHTML = randomQuoteIndex.rus;
            author.textContent = randomQuoteIndex.authorRus;
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

// Change active language buttons
langBtns.forEach(btn => btn.addEventListener('click', () => {
    let activeLang = Object.values(langBtns).filter(item => item.classList.contains('active'))[0];
    activeLang.classList.remove('active');
    
    btn.classList.add('active');
    sessionStorage.setItem('language', btn.textContent.toLowerCase());

    setQuote();
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
    reloadIconAnimation();

    let activeLang = Object.values(langBtns).filter(item => item.textContent.toLowerCase() === sessionStorage.getItem('language'))[0];
    activeLang.classList.add('active');
});