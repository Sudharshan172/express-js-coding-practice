const express = require("express");
const app = express();

app.get('/', (require, request)=>{
    response.send("Hello World!");
});

app.listen(3000);

/*app.listen(3000,()=>{
    console.log("Server Running")
});*/
