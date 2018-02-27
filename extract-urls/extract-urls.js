const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const extractPageUrls = async (url, selector) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const pageLinksSelector = selector;
    return [...$(pageLinksSelector)].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

// const testUrl = 'http://www.technopolis.bg/en//IT/Laptops/c/P11010101?pageselect=6&page=0&q=:price-asc&text=&layout=List&sort=price-asc';
// const testSelector = '.paging a';
// // const result = extractPageUrls(testUrl, testSelector);
// // console.log(result);

// const run = async () => {
//     const urls = await extractPageUrls(testUrl, testSelector);

//     console.log(urls);
// };

// run();

module.exports = {
    extractPageUrls,
};
