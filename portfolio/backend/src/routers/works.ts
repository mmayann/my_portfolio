import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get works by portfolio ID
router.get('/portfolio/:portfolioId', async (req: Request, res: Response) => {
    try {
        const { portfolioId } = req.params;
        const works = await prisma.work.findMany({
            where: { portfolio_id: Number(portfolioId) }
        });
        res.json(works);
    } catch (error) {
        console.error('Failed to fetch works:', error);
        res.status(500).json({ error: 'Failed to fetch works' });
    }
});

// Create a new work
router.post('/', async (req: Request, res: Response) => {
    try {
        const { portfolio_id, url } = req.body;
        const work = await prisma.work.create({
            data: {
                portfolio_id: Number(portfolio_id),
                url
            }
        });
        res.status(201).json(work);
    } catch (error) {
        console.error('Failed to create work:', error);
        res.status(500).json({ error: 'Failed to create work' });
    }
});

// Update an existing work
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { url } = req.body;
        const work = await prisma.work.update({
            where: { id: Number(id) },
            data: { url }
        });
        res.json(work);
    } catch (error) {
        console.error('Failed to update work:', error);
        res.status(500).json({ error: 'Failed to update work' });
    }
});

// Delete a work
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.work.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete work:', error);
        res.status(500).json({ error: 'Failed to delete work' });
    }
});

export default router;