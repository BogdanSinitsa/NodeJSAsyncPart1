import userApi from './user-api';

import express from 'express';

import async from 'async';

const app = express();

app.get('/first', function (req, res) {
    async.waterfall([
        next => {
            userApi.getUserList((err, users) => {
                next(err, users);
            });
        },
        (users, next) => {
            userApi.getUserDetails(users[0].id, next);
        }
    ], (err, userDetails) => {
        if (err) {
            res.status(500).end();
        } else {
            res.send(userDetails);
        }
    });
});

app.get('/all', function (req, res) {
    async.waterfall([
        next => {
            userApi.getUserList((err, users) => {
                next(err, users);
            });
        },
        (users, next) => {
            async.map(users.map(o => o.id), userApi.getUserDetails, (err, results) => {
                next(err, results)
            });
        }
    ], (err, result) => {
        if (err) {
            res.status(500).end();
        } else {
            res.send(result);
        }
    });
});

//Error
app.get('/first-user-city', function (req, res) {
    async.waterfall([
        next => {
            userApi.getUserList((err, users) => {
                next(err, users);
            });
        },
        (users, next) => {
            userApi.getUserDetails(users[0].id, next);
        }
    ], (err, userDetails) => {
        if (err) {
            res.status(500).end();
        } else {
            res.send(userDetails.addresses[0].city);
        }
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});