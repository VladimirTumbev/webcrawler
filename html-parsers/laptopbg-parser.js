/* globals Set */
const {
    getLaptopUrls,
} = require('../extract-urls/extract-laptop-urls');

const {
    extractPageUrls,
} = require('../extractors/extract-urls');

const {
    getLaptopInfoLaptopBg,
} = require('../extractors/extract-laptop-info-laptopbg');


const runLaptopBg = async () => {
    const url = 'https://laptop.bg/laptops-all?basic_color_' +
        'id_in_all=all&battery_type_id_in_all=all&brand_id_in_' +
        'all=all&cpu_type_id_in_all=all&display_size_type_btw_' +
        'all=all&display_type_id_in_all=all&hdd_type_size_id_in' +
        '_all=all&os_type_id_in_all=all&page=1&per_page=100&ram_' +
        'type_capacity_id_in_all=all&resolution_size_id_in_all=all' +
        '&search%5Bprice_btw%5D%5B%5D=500__599&search%5Bprice_btw%' +
        '5D%5B%5D=1200__1499&search%5Bprice_gte%5D=&search%5Bprice_' +
        'lte%5D=&search%5Bs%5D=promo_asc&ssd_size_id_in_all=all&type_' +
        'laptop_id_in_all=all&used_for_type_id_in_all=all&utf8=%E2%9C%' +
        '93&vga_type_id_in_all=all&warranty_size_btw_all=all&weight_type' +
        '_btw_all=all';
    const baseUrl = 'https://laptop.bg';
    const pageSelector = 'div.pagination a';
    const laptopUrlSelector = '.products li article div:not([class]) a';
    const uniquePages = new Set();
    uniquePages.add(url);
    const pages = await extractPageUrls(url, pageSelector);
    pages.map((page) => uniquePages.add(page));
    const uniquePagesArray = [...uniquePages];
    const allLaptopLinks = await Promise.all(uniquePagesArray
        .map((page) => {
            if (page.indexOf('.') > 0) {
                return getLaptopUrls(page, laptopUrlSelector);
            }
            const fullPage = baseUrl + page;
            return getLaptopUrls(fullPage, laptopUrlSelector);
        }));
    const uniqueLaptopLinks = new Set();
    allLaptopLinks.map((link) => uniqueLaptopLinks.add(link));
    const uniqueLaptopLinksArr = [...uniqueLaptopLinks];
    const laptopLinksAsOneArray = uniqueLaptopLinksArr
        .reduce((prev, current) => {
            return prev.concat(current);
        });
    const laptopbgLaptops = await Promise.all(laptopLinksAsOneArray
        .map((link) => getLaptopInfoLaptopBg(link)));
    return laptopbgLaptops;
};

const test = async () => {
    const testTest = await runLaptopBg();
    console.log(testTest);
    console.log(testTest.length);
};

test();
