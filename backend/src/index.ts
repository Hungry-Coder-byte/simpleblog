import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

app.use('/api/articles', articlesRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to SimpleBlog API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});