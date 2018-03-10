const {
    JSDOM,
} = require('jsdom');

const {
    infoFinder,
} = require('./technopolis-info-finder');

const $init = require('jquery');


const getLaptopInfoTechnopolis = async (url) => {
    const laptop = {};
    laptop.Memory = 'Няма информация';
    laptop.RAM = 'Няма информация';
    laptop.OS = 'Няма информация';
    const baseURL = 'http://www.technopolis.bg';
    const laptopUrl = `${baseURL}${url}`;
    const dom = await JSDOM.fromURL(laptopUrl);
    const $ = $init(dom.window);
    const charsSelector = 'table.table-characteristics tbody tr';
    const priceSelector = 'p.price.new-price.bold';
    laptop.Source = 'Technopolis';
    laptop.price = $(priceSelector).text()
        .replace(' ', '').replace('\n\t\t\t', ' ');
    [...$(charsSelector)].map((tr) => $(tr))
        .forEach(($tr) => {
            const children = $tr.children().toArray()
                .map((x) => $(x))
                .map(($x) => $x.text());
                infoFinder(children, laptop);
        });
    return laptop;
};

// const testUrl = '/bg/Laptops/Laptop-HP-15-AY016NU-X8P65EA/p/527916';

// const test = async () => {
//     const testLaptop = await getLaptopInfoTechnopolis(testUrl);
//     console.log(testLaptop);
// };

// test();

module.exports = {
    getLaptopInfoTechnopolis,
};
