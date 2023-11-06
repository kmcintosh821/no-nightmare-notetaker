const express = require('express');
const path = require('path');
const fs = require('fs');

const db = path.join(__dirname, 'db', 'db.json');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3333;

//HTML Routes

app.use(express.static('public'));
app.use(express.json());
app.use('/api', router)

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//API Routes

router.route('/notes')
    .get((req, res) => {
        const data = JSON.parse(fs.readFileSync(db, 'utf-8'));
        res.json(data);
    })  
    .post((req, res) => {
        const storedData = JSON.parse(fs.readFileSync(db, 'utf-8'));
        const newData = {
            title: req.body.title,
            text: req.body.text
        }
        storedData.push(newData);
        fs.writeFile(db, JSON.stringify(storedData, null, 4), () => {
            console.log ('Added new note.')
        })
    })


app.listen(PORT, () => console.log('Server started on %s', PORT));