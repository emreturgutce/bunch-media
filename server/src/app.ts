import express from 'express';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

export { app };
