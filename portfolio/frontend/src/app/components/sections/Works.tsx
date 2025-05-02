"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorks } from "../../../api";
import { Work } from "../../../types";
import Link from "next/link";
import axios from "axios";
import { FaGithub } from "react-icons/fa";


export default function Works() {
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("id") || "1";

  const [works, setWorks] = useState<Work[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorks() {
      setLoading(true);
      setError(null);
      try {
        if (!portfolioId || isNaN(Number(portfolioId))) {
          setError("ポートフォリオIDが無効です。");
          return;
        }
        const fetchedWorks = await getWorks(Number(portfolioId));
        if (!Array.isArray(fetchedWorks)) {
          throw new Error("作品データの形式が不正です。");
        }
        setWorks(fetchedWorks);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          setError("準備中・・・");
        } else {
          setError("作品データの取得に失敗しました。");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchWorks();
  }, [portfolioId]);

  if (works.length === 0) {
    return (
      <section id="works" className="mb-20 mt-20 grid items-center justify-center">
        <h2 className="text-3xl font-bold mb-20">Works</h2>
        <p>準備中・・・</p>
      </section>
    );
  }

  return (
    <section id="works" className="mb-5 mt-20 grid items-center justify-center">
      <h2 className="text-3xl font-bold mb-20 text-center px-5">Works</h2>
      <ul className="mb-5">
        {works.map((work) => (
          <li key={work.id} className="text-center">
            <Link href={work.url} target="_blank" rel="noopener noreferrer"  className="flex items-center underline">
            <FaGithub className="mr-3" size={33} />
              Githubへ
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}