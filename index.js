import dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './router.js'


dotenv.config();

const app = express()
    // Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
})


//midleware
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
    res.json({
        message: 'success'
    })
})

app.use('/api', router) //local

app.listen(process.env.PORT, () => {
    console.log(`app jalan di ${process.env.PORT}`)
})