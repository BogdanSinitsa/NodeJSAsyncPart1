
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

sleep(1000)
    .then(() => {
        console.log('awake 1');
        return sleep(2000);
    })
    .then(() => {
       throw 'Dummy error'
    })
    .catch(err => {
        console.log(err);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Errorrrrrrr');
            }, 3000);
        })
        // return 'Data';
    })
    .then((result) => {
        console.log('result:', result);
        console.log('@@@@@@@@@@@');
    })
    .catch(() => {
        console.log('catch 22222222');
    });
