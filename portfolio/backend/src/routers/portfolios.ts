import { Router, Request, Response } from 'express';
import { PrismaClient,Prisma } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = Router();

router.use(authMiddleware);

router.post('/', async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.userId;

        const { title, image, introduction } = req.body;

        const newPortfolio = await prisma.portfolio.create({
            data: {
                title,
                image,
                introduction,
                user: { 
                    connect: {
                        id: loggedInUserId,
                    },
                },
            },
        });

        res.status(201).json(newPortfolio);
    } catch (error) {
        console.error('ポートフォリオの作成に失敗しました:', error);
        res.status(500).json({ error: 'ポートフォリオの作成に失敗しました' });
    }
});


// Get all portfolios
router.get('/', async (req: Request, res: Response) => {
  try {
    const portfolios = await prisma.portfolio.findMany();
    res.json(portfolios);
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
});

// Get a specific portfolio by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: Number(id) },
      include: {
        works: true,
        skills: {
          include: {
            skillDetails: true
          }
        }
      }
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Create a new portfolio
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, image, introduction } = req.body;
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        image,
        introduction
      }
    });
    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Failed to create portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
});

// Update an existing portfolio

const validatePortfolio = [
  body('title').optional().notEmpty().withMessage('タイトルは空にできません'),
  body('image').optional().notEmpty().withMessage('画像は空にできません'),
  body('introduction').optional().notEmpty().withMessage('紹介文は空にできません'),
];

// ポートフォリオ更新API
router.put('/:id', validatePortfolio, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    const updateData: Prisma.PortfolioUpdateInput = req.body;

    const portfolio = await prisma.portfolio.update({
      where: { id: Number(id) },
      data: updateData,
    });



    res.json(portfolio);
  } catch (error: any) {
    console.error('ポートフォリオの更新に失敗しました:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: '指定されたポートフォリオは存在しません' });
    } else {
      res.status(500).json({ error: 'ポートフォリオの更新に失敗しました' });
    }
  }
});



// Delete a portfolio
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.portfolio.delete({      
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete portfolio:', error);
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
});

export default router;