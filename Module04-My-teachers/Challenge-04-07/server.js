const express  = require('express')
const nunjucks = require('nunjucks')
const routes   = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended:true }))
server.use(express.static("public"))
server.use(methodOverride('_method'))
server.use(routes)

//Setting view engine (nunjucks)
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

//Server door
server.listen(5000, function() {
    console.log("Server is Running")
})