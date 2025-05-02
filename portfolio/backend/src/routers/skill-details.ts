import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get skill details by skill ID
router.get('/skill/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skillDetails = await prisma.skillDetail.findMany({
      where: { skill_id: Number(id) }
    });
    res.json(skillDetails);
  } catch (error) {
    console.error('Failed to fetch skill details:', error);
    res.status(500).json({ error: 'Failed to fetch skill details' });
  }
});


// Create a new skill detail
router.post('/', async (req: Request, res: Response) => {
  try {
    const { skill_id, lang, star, years } = req.body;
    const skillDetail = await prisma.skillDetail.create({
      data: {
        skill_id: Number(skill_id),
        lang,
        star: star ? Number(star) : null,
        years,
      }
    });
    res.status(201).json(skillDetail);
  } catch (error) {
    console.error('Failed to create skill detail:', error);
    res.status(500).json({ error: 'Failed to create skill detail' });
  }
});

// Update an existing skill detail
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { lang, star, years } = req.body;
    const skillDetail = await prisma.skillDetail.update({
      where: { id: Number(id) },
      data: {
        lang,
        star: star ? Number(star) : null,
        years,
      }
    });
    res.json(skillDetail);
  } catch (error) {
    console.error('Failed to update skill detail:', error);
    res.status(500).json({ error: 'Failed to update skill detail' });
  }
});

// Delete a skill detail
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    await prisma.skillDetail.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('skill詳細を削除できませんでした。', error);
    if ((error as any).code === 'P2025') { 
      return res.status(404).json({ error: 'Skill detail not found' });
    }
    res.status(500).json({ error: 'Failed to delete skill detail' });
  }
});

export default router;