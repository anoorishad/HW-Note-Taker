const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uniqid'); 

const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded from data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//  GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        console.log(err);
        res.json(JSON.parse(data));
    })
});


//  POST Route for posting to notes
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        console.log(err);
        const notes = JSON.parse(data);
        req.body['id'] = uuid();
        notes.push(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            console.log(err);
            res.json(req.body);
        })
    })
});


// DELETE Route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        console.log(err);
        const notes = JSON.parse(data);
        const newNotes = notes.filter(note=> note.id != req.params.id);
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            console.log(err);
            res.json(req.body);
        })
    })
});







// GET Route for homepage
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for notes page
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//Wildcard route to direct users back to homepage
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);







app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);