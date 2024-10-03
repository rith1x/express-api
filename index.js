import express from 'express';
import quote from './routes/quote.js'; // Ensure .js extension

const app = express();

// Basic route
app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

// Quote route
app.use('/quote', quote);

const port = parseInt(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
