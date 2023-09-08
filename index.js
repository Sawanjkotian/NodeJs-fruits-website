//Reading and writing using Nodejs
const fs = require('fs')
//CodeBlockig and Synchronous way
/*
const { isUtf8 } = require('buffer');
const fs = require('fs');

const textIn=fs.readFileSync('./final/txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This what we know about avacado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync = ('./final/txt/output.txt', textOut);

console.log(textOut);
*/

//Non-blocing, asynchronous way
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1)=>{
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2)=>{
        console.log(data2);
        fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3)=>{
        console.log(data3);

        fs.writeFile('./starter/txt/start.txt',`${data1}\n${data2}`, 'utf-8',err=>{
            console.log('File has been written...');
        });
     });
    });
});

console.log('Reading file.....');

