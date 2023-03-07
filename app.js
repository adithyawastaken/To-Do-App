const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const routes = require('./router/routes')
    
app.use([express.json(), express.urlencoded({extended:true}), express.static('./public'), cookieParser()])
app.set('view engine', 'ejs')

app.use(routes)
app.all('*', (_,res) => res.send('This page doesn\'t exist!'))
app.listen(5000, console.log('Listening on port 5000'))

