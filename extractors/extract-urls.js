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

module.exports = {
    extractPageUrls,
};
