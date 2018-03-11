/* globals process*/
const {
    laptops,
    brand,
    characteristics,
    source,
} = require('../models');
const Sequelize = require('sequelize');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const filterBy = async (char, comparison, value) => {
    const Op = Sequelize.Op;
    let condition;
    if (comparison === 'lt') {
        condition = Op.lt;
    } else if (comparison === 'gt') {
        condition = Op.gt;
    } else {
        condition = Op.eq;
    }
    const filteredLaptops = await laptops.findAll({
        include: [{
            model: characteristics,
            attributes: ['name', 'value'],
            where: {
                name: {
                    $like: `%${char}%`,
                },
                value: {
                    [condition]: parseFloat(value),
                },
            },
        }],

    });
    const filteredArray = [];
    await Promise.all(filteredLaptops.map(async (laptop) => {
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

const letsPlayAGameFilter = async () => {
    rl.question('Ah, filter is your thing? Fine..' +
        ' filter by what? ex. Ram lt' +
        ' 8gb (with spaces between)', async (answer) => {
            const searching = answer.split(' ');
            if (!searching[0] || !searching[1] || !searching[2]) {
                console.log('WHAT ARE YOU DOING?' +
                    ' You can\'t just search like that..');
                console.log('Here.. let me help you.' +
                    ' You must put 3 parameters WHAT lt/gt/eq How much');
                console.log('with spaces between them.' +
                    ' lt = less than, gt = greater than, eq = equal to');
                console.log('So it should look' +
                    ' something like this: RAM lt 8gb');
                console.log('Got it? Let\'s try again...');
                letsPlayAGameFilter();
            } else {
                const resultArr = await
                filterBy(searching[0], searching[1], searching[2]);
                if (resultArr.length === 0) {
                    console.log('Kind\'a picky aren\'t we? Nothing found.');
                    rl.question('Try again? [y/n]', (newAnswer) => {
                        if (newAnswer === 'y') {
                            letsPlayAGameFilter();
                        } else {
                            console.log('Once a quitter,' +
                                ' always a quitter. Bye!');
                            rl.close();
                            process.exit(1);
                        }
                    });
                } else {
                    resultArr.
                    forEach((foundLaptop) => console.log(foundLaptop));
                    rl.question('My oh my, a lot of laptops,' +
                        ' not so picky after all, shall we ' +
                        'try your luck again? [y/n]', (anotherAnsower) => {
                            if (anotherAnsower === 'y') {
                                letsPlayAGameFilter();
                            } else {
                                console.log('Now that we are ' +
                                    'done, let\'s go to the pub!');
                                rl.close();
                                process.exit(1);
                            }
                        });
                }
            }
        });
};

module.exports = {
    letsPlayAGameFilter,
};
