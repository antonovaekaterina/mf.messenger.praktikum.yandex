const fs = require('fs-extra')

const outPutDir = './dist';

fs.remove(outPutDir)
    .then(() => {
        console.log(`${outPutDir} remove successfully`);
        return fs.ensureDir(outPutDir);
    })
    .then(() => {
        console.log(`${outPutDir} create successfully`);
        return fs.copy('./public', './dist');
    })
    .then(() => {
        console.log(`assets copy successfully in ${outPutDir}`)
    })
    .catch(err => {
        console.error(err)
    })


