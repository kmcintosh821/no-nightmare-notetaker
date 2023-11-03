const express = require('express');
const api_routes = require('./routes/api_routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('public'));

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'notes.html'));
})


app.listen(PORT, () => console.log('Server started on %s', PORT));


