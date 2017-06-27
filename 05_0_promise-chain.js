
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
        console.log('awake 2');
    })
    .then(() => {
        console.log('Dummy message');
    });