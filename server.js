'use strict';
const express=require('express')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const middleware=require('./middleware')
const api=require('./api')
const auth=require('./auth')

const app=express();
var port = process.env.PORT || 1337;

app.use(middleware.cors)
app.use(bodyParser.json)
app.use(cookieParser())

app.post('/login',auth.authenticate, auth.login)

app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server=app.listen(port, ()=>console.log('Server listening on port ${port}'))