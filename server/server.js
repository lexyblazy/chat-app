const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var IP = process.env.IP;
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
//    res.render('index.html');
})

app.listen(PORT,IP,()=>{
    console.log('Server is up and running on port 3000');
})