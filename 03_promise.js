import { readFile } from 'fs';
import { join } from 'path';

let dataFilePath = join(__dirname, 'data', 'users.json');

function reedJsonFile() {
    return new Promise((resolve, reject) => {
        readFile(dataFilePath, (err, data) => {
            if (!err) {
                let users = JSON.parse(data.toString());
                resolve(users);
            } else {
                reject(err);
            }
        });
    });
}

reedJsonFile()
    .then(users => {
        console.log(users);
    })
    .catch(err => {
        console.error(err);
    });

