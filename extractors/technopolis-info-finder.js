const infoFinder = (children, laptop) => {
    if (children[0].indexOf('Марка') >= 0) {
        const key = 'Brand';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('МОДЕЛ') >= 0) {
        const key = 'model';
        const value = children[1].replace('"', '');
        laptop[key] = value;
    } else if (children[0].indexOf('ТИП') >= 0 &&
        children[0].length === 3) {
        const key = 'Type';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('ЦВЯТ') >= 0) {
        const key = 'Color';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('ТИП ПРОЦЕСОР') >= 0) {
        const key = 'Processor';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('КАПАЦИТЕТ HDD') >= 0) {
        const key = 'Memory';
        const value = children[1] + ' HDD';
        laptop[key] = value;
    } else if (children[0].indexOf('КАПАЦИТЕТ SSD') >= 0) {
        const key = 'Memory';
        const value = children[1] + ' SSD';
        laptop[key] = value;
    } else if (children[0].indexOf('КАПАЦИТЕТ EMMC') >= 0) {
        const key = 'Memory';
        const value = children[1] + ' EMMC';
        laptop[key] = value;
    } else if (children[0].indexOf('КАПАЦИТЕТ RAM') >= 0) {
        const key = 'RAM';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('ГРАФИЧНА КАРТА') >= 0) {
        const key = 'Video';
        const value = children[1];
        laptop[key] = value;
    } else if (children[0].indexOf('ГРАФИЧНАТА ПАМЕТ') >= 0 &&
        children[1].replace(/\n/g, '').replace(/\t/g, '') !== 'НЕ') {
        laptop.Video += ` ${children[1]
                .replace(/\n/g, '').replace(/\t/g, '')}`;
    } else if (children[0].indexOf('INCH') >= 0) {
        const key = 'Screen';
        const value = children[1].substring(0, 4).trim() + ' inch';
        laptop[key] = value;
    } else if (children[0].indexOf('ОПЕРАЦИОННА') >= 0) {
        const key = 'OS';
        if (children[1]
            .replace(/\n/g, '').replace(/\t/g, '') === 'НЕ') {
            const value = 'без операционна система';
            laptop[key] = value;
        } else {
            const value = children[1];
            laptop[key] = value;
        }
    } else if (children[0].indexOf('ЧЕСТОТА НА ПРОЦЕСОРА') >= 0) {
        laptop.Processor += ` ${children[1]}`;
    }
};

module.exports = {
    infoFinder,
};
