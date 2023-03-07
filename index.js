const express = require('express');
const cookieParser = require('cookie-parser');
const port =  8001;
const app = express();

//for encryption 
app.use(express.urlencoded());

//use cookie 
app.use(cookieParser());

//require layouts
const expressLayouts = require('express-ejs-layouts');
//require mongoose
const db = require('./config/mongoose');

//extract style  and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use of static files
app.use(express.static('./assets'));

//use of layouts = always called before routes
app.use(expressLayouts);
 
//use of router
app.use('/',require('./routes'));


//setting up templete engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error in running a server: ${err}`); // interpolet style of console
    }
    console.log(`Server is running on port: ${port}`);
})