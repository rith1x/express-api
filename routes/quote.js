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
    // console.log(data);
}

apiInit();


router.get('/search',(req,res)=>{
    if (Object.keys(req.query).length === 0) {
        res.json({msg:"No queries found!"})
      } else {
        res.json({msg:"No queries found!"})
      }
})



// Define the /random route
router.get('/random', (req, res) => {
apiInit();

    let rdm = genRandom();
    let qbj = data[rdm]
    let minLength = parseInt(req.query.minLength) || null
    let maxLength = parseInt(req.query.maxLength) || null
    //    if(minLength){
    //     console.log(qbj)
    //     while(qbj.quote.length < minLength){
    //         rdm=genRandom();
    //     }
    //    }
    //    if(maxLength){
    //        while(qbj.quote.length > maxLength){
    //            rdm=genRandom();
    //            console.log(qbj)
    //     }
    //    } 
        
        // console.log(qbj)
    res.json({min:minLength,max:maxLength, quote: data[rdm].quote, author: data[rdm].author,category :data[rdm].category,id:rdm });
});
router.get('/',(req,res)=>{
    
res.json({response:"Server is Live! 😉"})

})
router.get('/:id',(req,res)=>{
apiInit();

    let rdm = req.params.id;
    res.json({ quote: data[rdm].quote, author: data[rdm].author,category :data[rdm].category,id:rdm });
})


router.get('/categories',(req,res)=>{
    res.json({
        categories : ['life', 'happiness', 'love', 'truth', 'inspiration', 'humor', 'philosophy', 'science', '', 'soul', 'books', 'wisdom', 'knowledge', 'education', 'poetry', 'hope', 'friendship', 'writing', 'religion', 'death', 'romance', 'success', 'arts', 'relationship', 'motivation', 'faith', 'mind', 'god', 'funny', 'quotes', 'positive', 'purpose']
    })
})
export default router;
