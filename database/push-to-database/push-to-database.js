const {
    characteristics,
    laptops,
    source,
    brand,
    type,
} = require('../models');

const {
    runLaptopBg,
} = require('../../crawlers/laptopbg-parser');

const {
    runTechnopolis,
} = require('../../crawlers/technopolis-parser');


const pushToDataBase = async (laptop) => {
    let sourceId = await source.findCreateFind({
        where: {
            source_name: laptop.Source,
        },
    });

    sourceId = sourceId[0].dataValues.id;
    let brandId = await brand.findCreateFind({
        where: {
            name: laptop.Brand,
        },
    });
    brandId = brandId[0].dataValues.id;
    let typeId = await type.findCreateFind({
        where: {
            name: laptop.Type,
        },
    });
    typeId = typeId[0].dataValues.id;
    let ramCharId = await characteristics.findCreateFind({
        where: {
            name: 'RAM',
            value: laptop.RAM,
        },
    });
    ramCharId = ramCharId[0].dataValues.id;
    let memoryCharId = await characteristics.findCreateFind({
        where: {
            name: 'Memory',
            value: laptop.Memory,
        },
    });
    memoryCharId = memoryCharId[0].dataValues.id;
    let processorCharId = await characteristics.findCreateFind({
        where: {
            name: 'Processor',
            value: laptop.Processor,
        },
    });
    processorCharId = processorCharId[0].dataValues.id;
    let screenCharId = await characteristics.findCreateFind({
        where: {
            name: 'Screen',
            value: laptop.Screen,
        },
    });
    screenCharId = screenCharId[0].dataValues.id;
    let videoCharId = await characteristics.findCreateFind({
        where: {
            name: 'Video',
            value: laptop.Video,
        },
    });
    videoCharId = videoCharId[0].dataValues.id;
    let osCharId = await characteristics.findCreateFind({
        where: {
            name: 'OS',
            value: laptop.OS,
        },
    });
    osCharId = osCharId[0].dataValues.id;
    let colorCharId = await characteristics.findCreateFind({
        where: {
            name: 'Color',
            value: laptop.Color,
        },
    });
    colorCharId = colorCharId[0].dataValues.id;

    laptop.sourceId = sourceId;
    laptop.brandId = brandId;
    laptop.typeId = typeId;
    const thisLaptop = await laptops.create(laptop);
    await thisLaptop.setCharacteristics([ramCharId, memoryCharId,
        processorCharId, screenCharId, videoCharId, osCharId, colorCharId,
    ]);
    console.log(`Laptop with id: ${thisLaptop.id} added`);
};


// const testLaptop = {
//     Source: 'Technopolis',
//     Price: '699.00 лв.',
//     Brand: 'HP',
//     Model: '15-AY016NU /X8P65EA',
//     Type: 'ЛАПТОП',
//     RAM: '8 GB',
//     Memory: '1000 GB HDD',
//     Processor: 'INTEL PENTIUM N3710 1.60 - 2.56 GHz',
//     Screen: '15.6 inch',
//     Video: 'AMD RADEON R5 M430 2 GB',
//     OS: 'без операционна система',
//     Color: 'ЧЕРВЕН',
// };

const fillDatabase = async () => {
    const laptopBgLaptops = await runLaptopBg();
    const technopolisLaptops = await runTechnopolis();
    // laptopBgLaptops.forEach((element) => {
    //     if (!element.model) {
    //         console.log(`${element.price} and ${element.Brand}
    //         and ${element.RAM} has a falsy
    // Model with ${typeof element.Model}`);
    //     } else if (element.model.length === 0) {
    //         console.log(`${element.price} has empty string for Model`);
    //     }
    // });
    await laptops.destroy({
        where: {},
    });
    await Promise.all(laptopBgLaptops.map(async (laptop) => {
        return await pushToDataBase(laptop);
    }));
    await Promise.all(technopolisLaptops.map(async (laptop) => {
        return await pushToDataBase(laptop);
    }));
};

module.exports = {
    fillDatabase,
};
