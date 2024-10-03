import express from 'express';
import { readFileSync } from 'fs';

const router = express.Router();

// Function to generate a random number
function genRandom() {
    return Math.floor(Math.random() * 48392); // Adjust max based on quotes.json length
}

let data;

// Load the quotes from the JSON file
function apiInit() {
    const file = readFileSync('./routes/quotes.json', 'utf8'); // Ensure correct path
    data = JSON.parse(file);
    console.log(data);
}

apiInit();

// Define the /random route
router.get('/random', (req, res) => {
    let rdm = genRandom();
    res.json({ quote: data[rdm].quote, author: data[rdm].author,category :data[rdm].category,id:rdm });
});

router.get('/:id',(req,res)=>{
    let rdm = req.params.id;
    res.json({ quote: data[rdm].quote, author: data[rdm].author,category :data[rdm].category,id:rdm });
})
export default router;
