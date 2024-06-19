const http = require('http')

const path = require('path')

const express = require('express')

const fs = require('fs')

var session = require('express-session')

const app = express()
const server = http.createServer(app)




app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:"abc"}));


// Configs

app.set('port', process.env.PORT || 3000
)


// Secçao de login

app.use('/pagamento/', (req, res, next) => {
    if(req.session.nome){
        next();
    } else{
        res.redirect('/index.html')
    }
});




app.use(express.static(path.join(__dirname)));


// Start
server.listen(app.get('port', () => {

    console.log(`O servidor esta rodando na porta`, app.get('port'))

}))

// Conectar
app.post('/login', (req, res))