import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // ユーザーの作成 (例: Firebase UID を使用)
        const user1 = await prisma.user.create({
            data: {
                firebaseUid: 'someFirebaseUid123', 
                email: 'test@example.com',   
                name: 'Test User',    
            },
        });

        // ポートフォリオの作成 (userId を指定)
        const portfolio1 = await prisma.portfolio.create({
            data: {
                userId: user1.id, // 作成したユーザーの ID を指定
                title: '私のポートフォリオ',
                image: 'https://firebasestorage.googleapis.com/v0/b/portfolio-82b1d.firebasestorage.app/o/mypic.jpg?alt=media&token=2fcc1136-b6ae-4208-8466-47671a7bd954',
                introduction: 'これは私のポートフォリオです。',
            },
        });

        // 作品の作成
        await prisma.work.createMany({
            data: [
                { portfolio_id: portfolio1.id, url: 'https://github.com/mmayann' },
            ],
        });

        // スキルの作成
        const skill1 = await prisma.skill.create({
            data: {
                portfolio_id: portfolio1.id,
                category: 'プログラミング言語',
                explanation: '使用可能なプログラミング言語',
            },
        });

        const skill2 = await prisma.skill.create({
            data: {
                portfolio_id: portfolio1.id,
                category: 'フレームワーク',
                explanation: '使用可能なフレームワーク',
            },
        });

        // スキル詳細の作成
        await prisma.skillDetail.createMany({
            data: [
                { skill_id: skill1.id, lang: 'JavaScript', star: 5 },
                { skill_id: skill1.id, lang: 'TypeScript', star: 4 },
                { skill_id: skill2.id, lang: 'React', star: 5 },
                { skill_id: skill2.id, lang: 'Node.js', star: 4 },
            ],
        });

        console.log('シーディングが完了しました。');
    } catch (e) {
        console.error('エラーが発生しました:', e);

    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('prisma.$disconnect()でエラー:', disconnectError);
        }
    }
}
main();