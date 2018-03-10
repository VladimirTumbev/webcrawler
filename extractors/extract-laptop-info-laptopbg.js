const {
    JSDOM,
} = require('jsdom');
const {
    infoFinder,
} = require('./laptopbg-info-finder');

const $init = require('jquery');


const getLaptopInfoLaptopBg = async (url) => {
    const laptop = {};
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    // console.log($(dom.window.document.body).html());
    const laptopBrandSelector = 'span[itemprop="child"] span.current';
    const charsSelectorKey = 'table.product-characteristics tbody th';
    const charsSelectorValue = 'table.product-characteristics tbody tr td';
    const priceSelector = 'div.offer div.price-container span.price';
    laptop.Source = 'laptopbg';
    let brand = $(laptopBrandSelector).text();
    brand = brand.substr(0, brand.indexOf(' '));
    laptop.Brand = brand;
    let model = $(laptopBrandSelector).text();
    model = model.replace(brand + ' ', '');
    laptop.model = model;
    laptop.price = $(priceSelector).text()
        .replace('\n', '').replace(' ', '').replace('лв.', ' лв.');
    const valuesArray = [...$(charsSelectorValue)].map((td) => $(td))
        .map(($td) => {
            if (!$td.hasClass('') && (!$td.closest('tr').hasClass('extras'))) {
                return $td.find('label')
                    .children(':first').text().replace(/\n/g, '');
            } else if ($td.closest('tr').hasClass('extras')) {
                return $td.text().replace(/\n/g, '');
            }
            return $td.text().replace(/\n/g, '');
        });
    const keysArray = [...$(charsSelectorKey)].map((th) => $(th))
        .map(($th) => $th.text().replace(/\n/g, ''));
    keysArray.forEach((key, index) => {
            infoFinder(key, index, laptop, valuesArray);
    });
    return laptop;
};

// const testUrl = 'https://laptop.bg/laptops-acer-Aspire_E5_576-acer_aspire_e5576g_NXGTZEX011500gbssd';

// const test = async () => {
//     const testLaptop = await getLaptopInfoLaptopBg(testUrl);
//     console.log(testLaptop);
// };

// test();

module.exports = {
    getLaptopInfoLaptopBg,
};
