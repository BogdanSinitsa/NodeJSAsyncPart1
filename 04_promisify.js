import { readFile } from 'fs';
import { join } from 'path';

import promisify from 'promisify-es6';

let dataFilePath = join(__dirname, 'data', 'users.json');

function reedJsonFile(callback) {
    readFile(dataFilePath, (err, data) => {
        if (!err) {
            let users = JSON.parse(data.toString());
            callback(null, users);
        } else {
            callback(err);
        }
    });
}

const reedJsonFilePromise = promisify(reedJsonFile);

reedJsonFilePromise()
    .then(users => {
        console.log(users);
    })
    .catch(err => {
        console.error(err);
    });