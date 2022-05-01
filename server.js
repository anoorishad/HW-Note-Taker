const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded from data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for notes page
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//  GET ROUTE for retrieving all the notes
express.Router('/api/notes', (req, res) => {
    fs.readFile('./db/db.json')
});


//Wildcard route to direct users back to homepage
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);






app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);