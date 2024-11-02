import express from 'express';
import cors from 'cors';
import quote from './routes/quote.js'; // Ensure .js extension
import tics from './routes/tics.js'; // Ensure .js extension
import game from './routes/game.js'; // Ensure .js extension
const app = express();

app.use(express.json())

const allowedOrigins = ['https://rith1x.github.io', 'http://127.0.0.1:5501', 'http://127.0.0.1:5502'];

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
  res.json({ message: "Hey there, I'm up and running!", service: "running" })
});

// Quote route
app.use('/quote', quote);
app.use('/tics', tics);
app.use('/game', game);

const port = parseInt(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
