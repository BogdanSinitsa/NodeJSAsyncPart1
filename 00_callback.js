import { readFile } from 'fs';
import { join } from 'path';

let dataFilePath = join(__dirname, 'data', 'users.json');

readFile(dataFilePath, (err, data) => {
    if (!err) {
        let users = JSON.parse(data.toString());
        console.log(users);
    } else {
        console.error(err);
    }
});
