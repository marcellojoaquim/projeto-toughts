const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const conn = require('./db/conn');

const app = express();
// models
const Tought = require('./models/Tought');
const User = require('./models/User');


//config tamplate engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// config receber res body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),cookie : {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now()+360000),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

// arquivos publicos
app.use(express.static('public'))

// set session
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next();
})


conn
    //.sync({force:true}) nesta instrução todas a entidades são removidas e recriadas no banco
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    })
