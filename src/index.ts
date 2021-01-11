import express from 'express';
import { json } from 'body-parser';
import { spaceShipRouter } from './routes/spaceship';

const app = express();
app.use(json);
app.use('/api/space-ship', spaceShipRouter);

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});