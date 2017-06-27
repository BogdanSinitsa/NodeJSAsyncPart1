import { readFile } from 'fs';
import { join } from 'path';

import promisify from 'promisify-es6';

let dataFilePath = join(__dirname, '..', 'data', 'users.json');

function readJsonFile(filePath, callback) {
    readFile(filePath, (err, data) => {
        if (!err) {
            let users = JSON.parse(data.toString());
            callback(null, users);
        } else {
            callback(err);
        }
    });
}

function getUserList(callback) {
    readJsonFile(dataFilePath, (err, users) => {
        if (err) {
            callback(err)
        } else {
            callback(null, users.map(o => ({
                id: o._id,
                name: o.name
            })));
        }
    });
}

function getUserDetails(id, callback) {
    readJsonFile(dataFilePath, (err, users) => {
        if (err) {
            callback(err)
        } else {
            for (let user of users) {
                if (user._id === id) {
                    callback(null, user);
                    return;
                }
            }
            callback(null, null);
        }
    });
}

export default {
    getUserList,
    getUserDetails,

    getUserListPromise: promisify(getUserList),
    getUserDetailsPromise: promisify(getUserDetails),
}