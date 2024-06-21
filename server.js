import express from 'express'

const app = express()

const users = []

const PORT = 3000



// http://localhost:3000/usuarios

app.post('/usuarios', (req, res) => {

    console.log(req)

    res.send('Ok, aqui deu certo')
})


// http://localhost:3000/usuarios

app.get('/usuarios', (req, res) => {
    res.send(`Ok deu bom`)
})




app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
