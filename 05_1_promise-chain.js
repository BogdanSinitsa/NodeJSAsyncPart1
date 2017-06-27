
function doSmth1() {
    return new Promise(resolve => {
       setTimeout(() => {
           resolve(1);
       }, 400);
    });
}

function doSmth2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, 400);
    });
}


doSmth1()
    .then(result => {
        console.log(result);
        return doSmth2();
    })
    .then(result => {
        console.log(result);
    });