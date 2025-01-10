import express from 'express';
import dotenv from 'dotenv';
import financeRoutes from './routes/finance';
import userRoutes from './routes/user';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/logger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/finance', financeRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});