const express = require('express');
const app = new express();
const port = 8000

app.get('/', function(request, response){
    response.sendFile(__dirname +'/index.html');
});

app.get('/success', function(request, response){
    response.sendFile(__dirname +'/success.html');
});
app.get('/error', function(request, response){
    response.sendFile(__dirname +'/error.html');
});

app.post('/pay', function(request, response){
    
    
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var maktappurl= 'https://maktapp.credit/v3/AddTransaction';

    var dataToPost = {
        "token": "E4B73FEE-F492-4607-A38D-852B0EBC91C9",
        "FcmToken ":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "currencyCode": query.currencyCode,
        "orderId": Math.random(),
        "amount": query.amount,      
        "customerEmail": query.customerEmail,
        "customerName":query.customerName,
        "customerPhone":query.customerPhone,
        "customerCountry":query.customerCountry,
        "lang": query.lang,
        "note": query.note,               
        };
      
    var requestMo = require('request');
    requestMo.post(
        maktappurl,
        dataToPost,
        function (error, presponse, body) {
            if (!error && presponse.statusCode == 200) {
                //console.log(body);
                response.writeHead(301,
                    {Location: '/success'}
                );
                response.end();
            }
            else{
                response.writeHead(301,
                    {Location: '/error?error='+body}
                );
                response.end();
            }
        }
    );



});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })