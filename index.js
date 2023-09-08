//Reading and writing using Nodejs
const fs = require('fs');
const http = require('http');
const url = require('url');


//====================FILES==================================================
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
/*
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
*/

//====================SERVER==================================================

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}


const tempOverview = fs.readFileSync('./final/templates/template-overview.html','utf-8');
const tempProduct = fs.readFileSync('./final/templates/template-product.html','utf-8');
const tempCard = fs.readFileSync('./final/templates/template-card.html','utf-8');
const data = fs.readFileSync('./final/dev-data/data.json','utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{

    const { query, pathname } = url.parse(req.url, true);
    
    //Overview page
    if(pathname ==='/' || pathname ==='/overview')
    {
        res.writeHead(200,{'Content-type':'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    
    //Product page
    else if(pathname === '/product'){
        const product  = dataObj[query.id];
        res.writeHead(200,{'Content-type':'text/html'});
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }

    //api
    else if(pathname ==='/api')
    {
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening to request on port 8000');
});