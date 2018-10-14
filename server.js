const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

})

hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
})

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url} -`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e){
            console.log(e)
        }
    })
    next();
});

// app.use( (req, res, next)=> {
//     res.render('maintenance.hbs')

// }) 

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {

    res.render('home.hbs', {

        pageTitle : 'Home Page',
        welcomeText : 'Welcome to the Homepage'
    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs', {

        pageTitle : 'About Page'
    })

});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : 'Projects Page'
    })
})

app.get('/bad', (req, res) => {

    res.send({
        code : 'ERROR CATASTROFICO'
    });

});

app.listen(port, () => {
    console.log('Server is up on port ', port);
})

