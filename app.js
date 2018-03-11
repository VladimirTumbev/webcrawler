/* globals process */
const {
    fillDatabase,
} = require('./database/push-to-database/push-to-database');
const {
    orderByPrice,
} = require('./database/database-queries/order-by-price');

const {
    letsPlayAGameFilter,
} = require('./database/database-queries/filter');

const {
    letsPlayAGameSearch,
} = require('./database/database-queries/search');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const run = () => {
    console.log('G\'day! I hear that you are in the market for a laptop!');
    console.log('Well, you have come to the right place!');
    console.log('Available commands: '+
    '1)updateDatabase 2)orderByPrice 3)filter 4)search');
    rl.question('so, which command shall it be today? \n', async (answer) => {
        if (answer.indexOf('updateDatabase') >= 0) {
            console.log('Ah, a smart choice! This may' +
                ' take a while.. sit back, relax and have a chat with Vladi ');
            await fillDatabase();
            rl.question('Done! Shall we go for '+
            'another command or was that it? [y/n] \n', (nextAnswer) => {
                if (nextAnswer === 'y') {
                    run();
                } else {
                    console.log('That\'s it?? Just update '+
                    'the database and bye bye? Well bye then!');
                    rl.close();
                    process.exit(1);
                }
            });
        } else if (answer.indexOf('orderByPrice') >= 0) {
            console.log('Ah, you are one of THOSE.. price first huh? fine.. ');
            await orderByPrice();
            rl.question('Done! Are you happy now? '+
            'Shall we try anothor command? [y/n] \n', (anotherAnswer) => {
                if (anotherAnswer === 'y') {
                    run();
                } else {
                    console.log('Excuse me, but that\'s cheap! '+
                    'Order by price and then bye bye, fine. Goodbye!');
                    rl.close();
                    process.exit(1);
                }
            });
        } else if (answer.indexOf('filter') >= 0) {
            console.log('Ah, we are getting to the good part..');
            letsPlayAGameFilter();
        } else if (answer.indexOf('search') >= 0) {
            console.log('I see a soul in search of answers..');
            letsPlayAGameSearch();
        } else {
            rl.question('commands are case sensitive... '+
            'did you make a booboo? [y/n] \n', (finalAnswer) => {
                if (finalAnswer === 'y') {
                    run();
                } else {
                    console.log('ok then... bye!');
                    rl.close();
                    process.exit(1);
                }
            });
        }
    });
};

run();
