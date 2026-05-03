import express, { Request, Response } from 'express';
import { z } from 'zod';
import Article from '../models/Articles';
import { authenticate } from '../middleware/auth';

const router = express.Router();

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).optional(),
});

// Create a new article
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const parsedData = articleSchema.parse(req.body);
    const article = new Article(parsedData);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

// Get all articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get a single article by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update an article by ID
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const parsedData = articleSchema.parse(req.body);
    const article = await Article.findByIdAndUpdate(req.params.id, parsedData, { new: true });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

// Delete an article by ID
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;