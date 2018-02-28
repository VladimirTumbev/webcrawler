const {
    getLaptopInfo,
} = require('../extract-urls/extract-laptop-info');
const makeReqRecursively = async (arr, laptops) => {
    if (arr.length === 0) {
        return;
    }
    const concurrent = 50;
    const currentElements = await arr.splice(0, concurrent);
    const laptop = await Promise.all(currentElements
        .map((laptopUrl) => getLaptopInfo(laptopUrl)));
    laptops.push(laptop);
    await makeReqRecursively(arr, laptops);
};

module.exports = {
    makeReqRecursively,
};
