/* globals Set*/
const {
    extractPageUrls,
} = require('../extractors/extract-urls');

const {
    getLaptopUrls,
} = require('../extractors/extract-laptop-urls');

const {
    makeReqRecursively,
} = require('../queue/queue');


const runTechnopolis = async () => {
    const url = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0'+
    '%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%'+
    '80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9B%D0%B0'+
    '%D0%BF%D1%82%D0%BE%D0%BF%D0%B8/c/P11010101?pageselect'+
    '=100&page=0&q=:price-asc&text=&layout=List&sort=price-asc';
    const pagesSelector = 'nav.paging ul li a';
    const laptopSelector = 'div.text h2 a';
    const baseUrl = 'http://www.technopolis.bg/bg//Компютри-и-периферия/Лаптопи/c/P11010101';
    const uniquePages = new Set();
    const laptops = [];
    let laptopsArray = [];
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
    const testTest = await runTechnopolis();
    console.log(testTest);
    console.log(testTest.length);
};

test();
