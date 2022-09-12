const PORT = 8080
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require ('dotenv').config()

const app = express()

app.use(cors())

app.get('/languages', async (req, res) => {
    const option = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
    }

    try {
        const response = await axios('https://google-translate20.p.rapidapi.com/languages', option)
        const arrayData = Object.keys(response.data.data).map( key => response.data.data[key])
        res.status(200).json(arrayData)
    } catch(err){
        console.err(err)
        res.status(500).json({
            message: err
        })
    }
})

app.get('/translation', async (req, res) => {
    const { textToTranslate, outputLanguage, inputLanguage } = req.query
    const option = {
        method: 'GET',
        params: {
            text: textToTranslate,
            tl: outputLanguage,
            sl: inputLanguage
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
    }

    try {
        const response = await axios('https://google-translate20.p.rapidapi.com/translate', option)
        res.status(200).json(response.data.data.translation)
    } catch(err){
        console.err(err)
        res.status(500).json({
            message: err
        })
    }
})

app.listen(PORT, () => {
    console.log("🚀 ~ file: server.js ~ line 10 ~ app.listen ~ PORT", PORT)
})