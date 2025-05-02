// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];

        try {
            const decodedToken = await getAuth().verifyIdToken(idToken);
            (req as Request & { userId: string }).userId = decodedToken.uid;
            next();
        } catch (error) {
            console.error('ID トークン検証エラー:', error);
            return res.status(401).json({ error: '認証失敗' });
        }
    } else {
        return res.status(401).json({ error: '認証情報がありません' });
    }
};