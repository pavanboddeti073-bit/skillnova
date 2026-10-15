import express from 'express';
import cors from 'cors';
import { apiRouter } from '../server/routes.ts';

const app = express();

app.use(cors());
app.use(express.json());

// Support both /api/xxx and /xxx routes
app.use('/api', apiRouter);
app.use(apiRouter);

export default app;
