/* globals Set*/
const {
    extractPageUrls,
} = require('../extract-urls/extract-urls');

const {
    getLaptopUrls,
} = require('../extract-urls/extract-laptop-urls');

const {
    makeReqRecursively,
} = require('../queue/queue');

const url = 'http://www.technopolis.bg/en/' +
    '/IT/Laptops/c/P11010101?pageselect=100&page=' +
    '0&q=:price-asc&text=&layout=List&sort=price-asc';
const pagesSelector = '.paging a';
const laptopSelector = 'div.text h2 a';
const baseUrl = 'http://www.technopolis.bg/en//IT/Laptops/c/P11010101';
const uniquePages = new Set();
const laptops = [];
let laptopsArray = [];
const run = async () => {
    uniquePages.add(url);
    const pages = await extractPageUrls(url, pagesSelector);
    pages.map((link) => uniquePages.add(link));
    const pagesArray = [...uniquePages];

    const laptopUrls = await Promise.all(pagesArray.map((uniquePage) => {
        const fullUrl = baseUrl + uniquePage;
        return getLaptopUrls(fullUrl, laptopSelector);
    }));
    const urlsAsOneArray = laptopUrls.reduce((prev, current) => {
        return prev.concat(current);
    });
    await makeReqRecursively(urlsAsOneArray, laptops);
    laptopsArray = laptops.reduce((prev, current) => {
        return prev.concat(current);
    });

    return laptopsArray;
};

const test = async () => {
    const testTest = await run();
    console.log(testTest.length);
};

test();
