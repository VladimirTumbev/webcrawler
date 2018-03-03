const {
    getLaptopInfoTechnopolis,
} = require('../extractors/extract-laptop-info-technopolis');

const makeReqRecursively = async (arr, laptops) => {
    if (arr.length === 0) {
        return;
    }
    const concurrent = 10;
    const currentElements = await arr.splice(0, concurrent);
    const laptop = await Promise.all(currentElements
        .map((laptopUrl) => getLaptopInfoTechnopolis(laptopUrl)));
    laptops.push(laptop);
    await makeReqRecursively(arr, laptops);
};

module.exports = {
    makeReqRecursively,
};
