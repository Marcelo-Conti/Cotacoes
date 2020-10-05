const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const { Console } = require('console')

const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//HANDLEBARS
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (rep,res) => {
    res.render('index', {
        title: "Bem vindo ao sistema de cotações",
        author: 'Marcelo De Conti'
    })
})

app.get('/about', (rep,res) => {
    res.render('about', {
        title: "Sobre",
        author: 'Marcelo De Conti'
    })
})

app.get('/help', (rep,res) => {
    res.render('help', {
        title: "Ajuda",
        author: 'Marcelo De Conti'        
    })
})



app.use(express.static(publicDirectoryPath))

//app.get('', (req, res) => {
//    res.send('<h1>Hello minha app</h1>')
//})

//app.get('/help', (req, res) => {
//    res.send('Help page')
//})

//app.get('/about', (req, res) => {
//    res.send('Sobre')
//})

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo)
     {
        const error = {
            message: 'O ativo deve ser informado'
        }
        res.status(400).json(error)
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (data, err) => {
        if(err){
            console.log(err)
            return res.status(500).json(err)
        }
        console.log(data)
        res.status(200).json(data)
    })

})

app.get('*', (req,res)=> {
//    res.send('404')
    res.render('404', {
        title: '404',
        errorMessage: 'Esta página não existe!',
        author: 'Marcelo De Conti'  
    })
}) 

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
