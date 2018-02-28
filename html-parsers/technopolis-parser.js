/* globals Set*/
const {
    extractPageUrls,
} = require('../extract-urls/extract-urls');

const {
    getLaptopUrls,
} = require('../extract-urls/extract-laptop-urls');

const {
    getLaptopInfo,
} = require('../extract-urls/extract-laptop-info');

const url = 'http://www.technopolis.bg/en/' +
    '/IT/Laptops/c/P11010101?pageselect=100&page=' +
    '0&q=:price-asc&text=&layout=List&sort=price-asc';
const pagesSelector = '.paging a';
const laptopSelector = 'div.text h2 a';
const baseUrl = 'http://www.technopolis.bg/en//IT/Laptops/c/P11010101';
const uniquePages = new Set();
const run = async () => {
    const pages = await extractPageUrls(url, pagesSelector);
    pages.map((link) => uniquePages.add(link));
    const pagesArray = [...uniquePages];

    const laptopUrls = await Promise.all(pagesArray.map((uniquePage) => {
        const fullUrl = baseUrl + uniquePage;
        return getLaptopUrls(fullUrl, laptopSelector);
    }));

    const laptop = await Promise.all(laptopUrls.slice(0, 2)
        .map((laptopUrl) => getLaptopInfo(laptopUrl)));
    console.log(laptop);
};

run();
