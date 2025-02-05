const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.urlencoded({extended:true}))
app.use(cors())
require('dotenv').config()
app.use(express.json())

const UserRouter = require('./routes/router')

app.use('/user',UserRouter)


app.listen(process.env.PORT,()=>{
    console.log("server running "+ process.env.PORT)
})