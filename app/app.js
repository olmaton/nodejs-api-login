const express = require('express')
const app = express()

//Configuración
 app.set("port",process.env.PORT||3000)

//Middlewares
app.use(express.json())

//Rutas
app.get("/",(req,res)=>res.send("hola mundo"))
app.use("/api/user",require('./routes/usuario'))
module.exports = app