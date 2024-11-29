import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes/intex';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the express typescript boilerplate');
});

// global error handler
app.use(globalErrorHandler);

// not found route handler
app.use(notFound);

export default app;
