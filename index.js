const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");

const port=3030;
const address = "localhost";



global.users =[
    {name:"Júlio César Luz",address:"Rua Luz, 777",email:"julioluz@hotmail.com",age:19,height:1.83,vote:true},
    {name:"Thiago Marinho",address:"Rua Cavalo, 86",email:"marinhooceano@yahoo.com.br",age:19,height:1.86,vote:true},
    {name:"Jonathan Silva",address:"Rua 23,65",email:"jonathanlindinho@gmail.com",age:19,height:1.70,vote:true}
];




app.set('view engine','ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 
app.use('/',routes);



const server = app.listen(port,address,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e porta ${port}`);
});


