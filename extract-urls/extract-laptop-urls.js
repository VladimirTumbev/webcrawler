const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getLaptopUrls = async (url, selector) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const laptopUrlSelector = selector;
    return [...$(laptopUrlSelector)].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

module.exports = {
    getLaptopUrls,
};

