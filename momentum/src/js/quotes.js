/* eslint-disable no-undef */
export default (lang = 'en-EN') => {
    const changeQuote = document.querySelector('.change-quote-icon');
    const quote = document.querySelector('.footer__quote');
    const author = document.querySelector('.footer__quote-author');

    changeQuote.onclick = () => getQuotes();

    async function getQuotes() {
        const quotes = `./assets/json/quotes-${lang}.json`;
        const response = await fetch(quotes);
        const data = await response.json();
        const randomNumberOfQuote = Math.floor((Math.random() * data.length));

        quote.textContent = `"${getContext(data, randomNumberOfQuote, 'quote')}"`;
        author.textContent = getContext(data, randomNumberOfQuote, 'author');
    }

    function getContext(data, number, value) {
        return data[number][value];
    }

    getQuotes();
};
