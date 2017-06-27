import userApi from './user-api';

import express from 'express';

const app = express();

app.get('/first', function (req, res) {
    userApi.getUserList((err, users) => {
        if (err) {
            console.log(err);
            return;
        }

        userApi.getUserDetails(users[0].id, (err, userDetails) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(userDetails);
        });
    });
});

app.get('/all', function (req, res) {
    userApi.getUserList((err, users) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }

        let allData = [];
        users.forEach(user => {
            userApi.getUserDetails(user.id, (err, userDetails) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                    return;
                }

                allData.push(userDetails);

                if (allData.length === users.length) {
                    res.send(allData);
                }
            });
        });


    });
});

//Error
app.get('/first-user-city', function (req, res) {
    try {
        userApi.getUserList((err, users) => {
            try {
                if (err) {
                    console.log(err);
                    return;
                }

                userApi.getUserDetails(users[0].id, (err, userDetails) => {
                    try {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        res.send(userDetails.addresses[0].city);
                    } catch (e) {
                        console.log(err);
                        res.status(500).end();
                    }//COMMON ERROR!!!
                });
            } catch (e) {
                console.log(err);
                res.status(500).end();
            }
        });
    } catch (e) {
        console.log(err);
        res.status(500).end();
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});