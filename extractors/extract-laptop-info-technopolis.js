const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');


const getLaptopInfoTechnopolis = async (url) => {
    const laptop = {};
    const baseURL = 'http://www.technopolis.bg';
    const laptopUrl = `${baseURL}${url}`;
    const dom = await JSDOM.fromURL(laptopUrl);
    const $ = $init(dom.window);
    const charsSelector = 'table.table-characteristics tbody tr';
    const priceSelector = 'p.price.new-price.bold';
    /* using Bulgarian word for PRICE 'ЦЕНА' to be
    consistent with the rest of the key values */
    laptop.ЦЕНА = $(priceSelector).text()
    .replace(' ', '').replace('\n\t\t\t', ' ');
    [...$(charsSelector)].map((tr) => $(tr))
        .map(($tr) => {
            const children = $tr.children().toArray()
                .map((x) => $(x))
                .map(($x) => $x.text());
            const key = children[0];
            const value = children[1].replace('\n\t\t\t\t\t\t\t\t\t', '');
            laptop[key] = value;
        });
    return laptop;
};

module.exports = {
    getLaptopInfoTechnopolis,
};

