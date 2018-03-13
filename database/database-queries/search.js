/* globals process*/
const {
    laptops,
    brand,
    characteristics,
    source,
} = require('../models');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
const searchBy = async (what) => {
    const filteredLaptops = await laptops.findAll({
        include: [{
            model: characteristics,
            attributes: ['name', 'value'],
            where: {
                value: {
                    $like: `%${what}%`,
                },
            },
        }],
    });
    const filteredArray = [];
     await Promise.all(filteredLaptops
        .map(async (laptop) => {
            const currentLaptop = {};
            const laptopBrand = await brand.find({
                where: {
                    id: laptop.brandId,
                },
            });
            const laptopSource = await source.find({
                where: {
                    id: laptop.sourceId,
                },
            });
            currentLaptop.brand = laptopBrand.dataValues.name;
            currentLaptop.source = laptopSource.dataValues.source_name;
            currentLaptop.model = laptop.model;
            currentLaptop.price = laptop.price;
            const attribute = laptop.dataValues
                .characteristics[0].dataValues.name;
            currentLaptop[attribute] = laptop.dataValues
                .characteristics[0].dataValues.value;
            filteredArray.push(currentLaptop);
        }));
    return filteredArray;
};

const letsPlayAGameSearch = async () => {
    rl.question('What would '+
    'you like to search for? examples: linux, 15.6, 8gb: ', async (answer) => {
        console.log(answer);
        const theAnswer = await searchBy(answer);
        if (theAnswer.length === 0) {
            console.log('Woops, these were not the '+
            'droids you are looking for!');
            rl.question('Try again? [y/n] ', (newAnswer) => {
                if (newAnswer === 'y') {
                    letsPlayAGameSearch();
                } else {
                    console.log('Thank you, goodbye');
                    rl.close();
                    process.exit(1);
                }
            });
        } else {
            console.table(theAnswer);
            // theAnswer.forEach((foundLaptop) => console.table(foundLaptop));
            rl.question('Woah, that\'s a lot of laptops '+
            'fancy another go? [y/n] ',
                async (afterSearchAnswer) => {
                    if (afterSearchAnswer === 'y') {
                        letsPlayAGameSearch();
                    } else {
                        console.log('Booo, boring! Bye bye');
                        rl.close();
                        process.exit(1);
                    }
                });
        }
    });
};

module.exports = {
    letsPlayAGameSearch,
};
