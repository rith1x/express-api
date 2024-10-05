import express from 'express';
import cors from 'cors';
import quote from './routes/quote.js'; // Ensure .js extension
const app = express();

const allowedOrigins = ['https://rith1x.github.io', 'http://127.0.0.1:5501'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
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
