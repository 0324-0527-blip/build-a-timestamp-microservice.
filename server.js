import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.sendFile(import.meta.dirname + '/views/index.html');
});

const sendTimestamp = (dateInput, res) => {
  const date =
    dateInput !== undefined && /^-?\d+$/.test(dateInput)
      ? new Date(Number(dateInput))
      : new Date(dateInput ?? Date.now());

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

app.get('/api', (_req, res) => sendTimestamp(undefined, res));
app.get('/api/:date', (req, res) => sendTimestamp(req.params.date, res));

const PORT = 8000;
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
