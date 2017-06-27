import userApi from './user-api';

import express from 'express';

const app = express();

app.get('/first', function (req, res) {
    userApi.getUserListPromise()
        .then(users => {
            return userApi.getUserDetailsPromise(users[0].id)
        })
        .then(userDetails => {
            res.send(userDetails);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        });
});

app.get('/all', function (req, res) {
    userApi.getUserListPromise()
        .then(users => Promise.all(users.map(user => userApi.getUserDetailsPromise(user.id))))
        .then(results => {
            res.send(results);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        });
});

//Error
app.get('/first-user-city', function (req, res) {
    userApi.getUserListPromise()
        .then(users => {
            return userApi.getUserDetailsPromise(users[0].id)
        })
        .then(userDetails => {
            res.send(userDetails.addresses[0].city); //COMMON ERROR!!!
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});