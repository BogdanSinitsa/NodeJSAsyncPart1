
//
function readFile() {
    return new Promise(resolve => {
        // Some code here
        throw new Error('file corrupt error');
        //OR REJECT
        //OR RUNTIME ERROR
    });
}

readFile()
    .then(() => {
        console.log('success');
    })
    .catch(err => {
        console.log(err.message);
    });
