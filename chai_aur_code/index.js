require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/contact',(req,res)=>{
    res.send("Contact us at: 1111111111111111111111111111111111111111111")
})
app.get('/youtube',(req,res)=>{
    res.send("<h3>Subscribe to our channel</h3>")
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})