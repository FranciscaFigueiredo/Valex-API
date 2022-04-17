import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from './routes/index'
import serverMiddlewareError from './middlewares/serverMiddlewareError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(serverMiddlewareError);

export {
    app,
}
