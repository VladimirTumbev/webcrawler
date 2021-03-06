const {
    laptops,
    brand,
    characteristics,
    source,
    type,
} = require('../models');

const orderByPrice = async (sorting = 'asc') => {
    let allLaptops = await laptops.findAll();
    allLaptops = await Promise.all(allLaptops
        .sort((x, y) => {
            if (sorting === 'asc') {
                return parseFloat(x.price) - parseFloat(y.price);
            }
            return parseFloat(y.price) - parseFloat(x.price);
        })
        .map(async (laptop) => {
            const laptopSource = await source.find({
                where: {
                    id: laptop.sourceId,
                },
            });
            const laptopBrand = await brand.find({
                where: {
                    id: laptop.brandId,
                },
            });
            const laptopType = await type.find({
                where: {
                    id: laptop.typeId,
                },
            });
            const laptopCharacteristics = await laptops.findAll({
                include: [{
                    model: characteristics,
                    // as: 'laptopsCharacteristics',
                    charateristics: ['name', 'value'],
                    through: {
                        charateristics: [],
                    },
                }],
                where: {
                    id: laptop.id,
                },
            });
            laptop = {
                id: laptop.id,
                source: laptopSource.source_name,
                brand: laptopBrand.name,
                model: laptop.model,
                price: laptop.price,
                type: laptopType.name,
            };
            laptopCharacteristics[0].characteristics.forEach((element) => {
                laptop[element.dataValues.name] = element.dataValues.value;
            });
            return laptop;
        }));
    console.table(allLaptops);
};

module.exports = {
    orderByPrice,
};
