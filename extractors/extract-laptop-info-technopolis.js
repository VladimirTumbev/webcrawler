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
    laptop.Източник = 'Technopolis';
    laptop.Цена = $(priceSelector).text()
        .replace(' ', '').replace('\n\t\t\t', ' ');
    [...$(charsSelector)].map((tr) => $(tr))
        .forEach(($tr) => {
            const children = $tr.children().toArray()
                .map((x) => $(x))
                .map(($x) => $x.text());
            if (children[0].indexOf('Марка') >= 0) {
                const key = children[0];
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('МОДЕЛ') >= 0) {
                const key = 'Модел';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('ТИП') >= 0
            && children[0].length === 3) {
                const key = 'Тип';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('ЦВЯТ') >= 0) {
                const key = 'Цвят';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('ТИП ПРОЦЕСОР') >= 0) {
                const key = 'Процесор';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('КАПАЦИТЕТ HDD') >= 0) {
                const key = 'Памет';
                const value = children[1] + ' HDD';
                laptop[key] = value;
            } else if (children[0].indexOf('КАПАЦИТЕТ SSD') >= 0) {
                const key = 'Памет';
                const value = children[1] + ' SSD';
                laptop[key] = value;
            } else if (children[0].indexOf('КАПАЦИТЕТ RAM') >= 0) {
                const key = 'RAM';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('ГРАФИЧНА КАРТА') >= 0) {
                const key = 'Видео Карта';
                const value = children[1];
                laptop[key] = value;
            } else if (children[0].indexOf('ГРАФИЧНАТА ПАМЕТ') >= 0
            && children[1].replace(/\n/g, '').replace(/\t/g, '') !== 'НЕ') {
                    laptop['Видео Карта'] += ` ${children[1]
                        .replace(/\n/g, '').replace(/\t/g, '')}`;
            } else if (children[0].indexOf('INCH') >= 0) {
                const key = 'Екран';
                const value = children[1].substring(0, 4).trim() + ' inch';
                laptop[key] = value;
            } else if (children[0].indexOf('ОПЕРАЦИОННА') >= 0) {
                const key = 'Операционна система';
                if (children[1]
                    .replace(/\n/g, '').replace(/\t/g, '') === 'НЕ') {
                    const value = 'без операционна система';
                    laptop[key] = value;
                } else {
                    const value = children[1];
                    laptop[key] = value;
                }
            } else if (children[0].indexOf('ЧЕСТОТА НА ПРОЦЕСОРА') >= 0) {
                laptop['Процесор'] += ` ${children[1]}`;
            }
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
