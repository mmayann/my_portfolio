import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();


// Get skills by portfolio ID
router.get('/portfolios/:id', async (req: Request, res: Response) => {
  try {
    const portfolioId = req.params.id; // req.params.id を使用
    const portfolioIdNum = parseInt(portfolioId, 10); // 10進数でパース

    if (isNaN(portfolioIdNum) || portfolioIdNum <= 0) {
      return res.status(400).json({ error: 'Invalid portfolioId' });
    }

    const skills = await prisma.skill.findMany({
      where: { portfolio_id: portfolioIdNum },
    });

    if (!skills || skills.length === 0) {
      // portfolioIdに該当するデータが存在しない場合
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(skills);
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    res.status(500).json({ error: 'Internal server error' }); // 一般的なエラーメッセージ
  }
});

// Create a new skill
router.post('/', async (req: Request, res: Response) => {
  try {
    const { portfolio_id, category, explanation } = req.body;
    const skill = await prisma.skill.create({
      data: {
        portfolio_id: Number(portfolio_id),
        category,
        explanation
      }
    });
    res.status(201).json(skill);
  } catch (error) {
    console.error('Failed to create skill:', error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// Update an existing skill
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category, explanation } = req.body;
    const skill = await prisma.skill.update({
      where: { id: Number(id) },
      data: {
        category,
        explanation
      }
    });
    res.json(skill);
  } catch (error) {
    console.error('Failed to update skill:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// Delete a skill
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete skill:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

export default router;