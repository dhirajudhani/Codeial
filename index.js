const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const port =  8001;
const app = express();
//require layouts
const expressLayouts = require('express-ejs-layouts');
//require mongoose
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// // setup the chat server to be used with socket.io
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(5001);
// console.log('chat server is listening on port 5000');
const path = require('path');

if(env.name=='development'){
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'/scss'),
    dest:path.join(__dirname,env.asset_path,'/css'),
    debug: true, // show err in terminal while writing scss
    outputStyle:'extended',
    prefix:'/css'
}));
}
//for encryption 
app.use(express.urlencoded());

//use cookie 
app.use(cookieParser());



//extract style  and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use of static files
app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads')); //path = codeial/uploads

//use of layouts = always called before routes
app.use(expressLayouts);




//setting up templete engine
app.set('view engine','ejs');
app.set('views','./views');

//middleware that takes cookies and make it encrypt 
//Mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment 
    secret: env.session_cookie_key,  // use to encrypt data
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) //session expire in ms
    },
    store:  new MongoStore(
        {
            mongooseConnection:db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup'); 
        }
    )
}
));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use of router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running a server: ${err}`); // interpolet style of console
    }
    console.log(`Server is running on port: ${port}`);
})