const express = require('express');
const path = require('path');

//Sécurité
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const nocache = require('nocache');

//Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(helmet()); //Protéger les en-têtes http

//Accès à l'api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Cookies
const expiresDate = new Date(Date.now() + 60 * 60 * 1000);

app.use(cookieSession({
    secret: 'sessionS3cur3',
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'http://localhost:8080',
        expires: expiresDate
    }
})
);

app.use(nocache());

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(xssClean());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', loginRoutes); //Enregistrer la route d'authentification 
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;