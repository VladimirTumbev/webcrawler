const infoFinder = (key, index, laptop, valuesArray) => {
    if (key.indexOf('лаптоп') >= 0) {
        key = 'Type';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Оперативна') >= 0) {
        key = 'RAM';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Процесор') >= 0) {
        key = 'Processor';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Видео') >= 0) {
        key = 'Video';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Памет') >= 0) {
        key = 'Memory';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Екран') >= 0) {
        key = 'Screen';
        laptop[key] = valuesArray[index]
            .substring(0, 4).trim() + ' inch';
    } else if (key.indexOf('Операционна') >= 0) {
        key = 'OS';
        laptop[key] = valuesArray[index];
    } else if (key.indexOf('Цвят') >= 0) {
        key = 'Color';
        laptop[key] = valuesArray[index];
    } else {
        return;
    }
};

module.exports = {
    infoFinder,
};
