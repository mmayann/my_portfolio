'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPortfolioById } from '../../../api';
import { Portfolio } from '../../../types';

export default function Hero() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await getPortfolioById(1)) as Portfolio;
        setPortfolio(data);
      } catch (error) {
        console.error('ポートフォリオデータの取得に失敗しました:', error);
      }
    }
    fetchData();
  }, []);

  if (!portfolio) {
    return <p>ロード中...</p>;
  }

  return (
    <section id="hero" className="mb-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-20 mt-20">{portfolio.title}</h2>
        <div className="grid items-center justify-center">
          <Image
            src={portfolio.image}
            alt="プロフィール画像"
            width={160}
            height={160}
            className="rounded-[52%_48%_32%_68%_/_57%_41%_59%_43%] mb-20 block mx-auto"
          />
          <p className="grid items-center justify-center">{portfolio.introduction}</p>
        </div>
      </div>
    </section>
  );
}