const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const {Worker} = require('worker_threads');

const app = express();
app.use(cors());
app.use(express.json);

const PORT = 3000;

const keywords = JSON.parse(fs.readFileSync('keywords.json', 'utf-8'));

app.post('/search', (req, res) =>{
    const { keyword } = req.body;
    if (keyword[keyword]) {
        res.json(keywords[keyword]);
    } else {
        res.status(404).json({ message: 'ключевое слово не найдено'});
    } 
});

app.post('/download', (req, res) => {
    const { url, threadCount } = req.body;

    const worker = new Worker('./downloader.js', {workerData: { url, threadCount } });
    worker.on('message', (message) => {
        res.send(message);
    });

    worker.on('error', (error) => {
        res.status(500).send({ message: error.message});
    });
});

app.listen(PORT, () => {
    console.log(<code>Сервер запущен на http://localhost:${PORT}</code>)
});

