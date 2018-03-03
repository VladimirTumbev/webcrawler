const {
    JSDOM,
} = require('jsdom');

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
    let brand = $(laptopBrandSelector).text();
    brand = brand.substr(0, brand.indexOf(' '));
    laptop.Марка = brand;
    let model = $(laptopBrandSelector).text();
    model = model.replace(brand + ' ', '');
    laptop.МОДЕЛ = model;
    laptop.ЦЕНА = $(priceSelector).text()
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
        laptop[key] = valuesArray[index];
    });
    return laptop;
};

module.exports = {
    getLaptopInfoLaptopBg,
};
