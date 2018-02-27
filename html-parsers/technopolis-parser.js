/* globals Set*/
const {
    extractPageUrls,
} = require('../extract-urls/extract-urls');

const url = `http://www.technopolis.bg/en//IT/Laptops/c/P11010101?pageselect=100&page=
0&q=:price-asc&text=&layout=List&sort=price-asc`;
const selector = '.paging a';
const uniquePage = new Set();
const run = async () => {
    const urls = await extractPageUrls(url, selector);
    urls.forEach((link) => uniquePage.add(link));
    console.log(uniquePage);
};

run();
