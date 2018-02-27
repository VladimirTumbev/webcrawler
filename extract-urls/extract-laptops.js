const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getLaptopInfo = async (url) => {
    const laptop = {};
    const baseURL = 'http://www.technopolis.bg';
    const laptopUrl = `${baseURL}${url}`;
    const dom = await JSDOM.fromURL(laptopUrl);
    const $ = $init(dom.window);
    const charsSelector = 'table.table-characteristics tbody tr';
    [...$(charsSelector)].map((tr) => $(tr))
        .map(($tr) => {
            const children = $tr.children().toArray()
                .map((x) => $(x))
                .map(($x) => $x.text());
            const key = children[0];
            const value = children[1].replace('ДА\n\t\t\t\t\t\t\t\t\t', 'YES')
                .replace('НЕ\n\t\t\t\t\t\t\t\t\t', 'NO');
            laptop[key] = value;
        });
    return laptop;
};

const testLink = '/en/Laptops/Laptop-DELL'+
'-INSPIRON-3567-066874-FHD-SIL/p/511687';

const run = async () => {
    console.log(await getLaptopInfo(testLink));
};

run();
