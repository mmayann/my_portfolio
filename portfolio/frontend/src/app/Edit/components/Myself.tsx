"use client";

import Image from "next/image";
import {
  getPortfolioById,
  updatePortfolio,

} from "../../../api";
import { Portfolio } from "../../../types";
import { useEffect, useState } from "react";

export default function Myself() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const [editingIntroduction, setEditingIntroduction] = useState(false);


  const [tempTitle, setTempTitle] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [tempIntroduction, setTempIntroduction] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPortfolio = (await getPortfolioById(1)) as Portfolio;
        setPortfolio(fetchedPortfolio);

        setTempTitle(fetchedPortfolio.title);
        setTempImage(fetchedPortfolio.image);
        setTempIntroduction(fetchedPortfolio.introduction);
      } catch (err) {
        console.error("ポートフォリオデータの取得に失敗しました:", err);
        setError("ポートフォリオデータの取得に失敗しました。");
      }
    }
    fetchData();
  }, []);

  const handleUpdateTitle = async () => {
    if (!portfolio) return;

    try {
      const updatedPortfolio = { ...portfolio, title: tempTitle };
      await updatePortfolio(portfolio.id, { title: tempTitle });
      setPortfolio(updatedPortfolio);
      setEditingTitle(false);
    } catch (err) {
      console.error("タイトルの更新に失敗しました:", err);
      setError("タイトルの更新に失敗しました。");
    }
  };

  const handleUpdateImage = async () => {
    if (!portfolio) return;

    try {
      const updatedPortfolio = { ...portfolio, image: tempImage };
      await updatePortfolio(portfolio.id, { image: tempImage });
      setPortfolio(updatedPortfolio);
      setEditingImage(false);
    } catch (err) {
      console.error("画像の更新に失敗しました:", err);
      setError("画像の更新に失敗しました。");
    }
  };

  const handleUpdateIntroduction = async () => {
    if (!portfolio) return;

    try {
      const updatedPortfolio = { ...portfolio, introduction: tempIntroduction };
      await updatePortfolio(portfolio.id, { introduction: tempIntroduction });
      setPortfolio(updatedPortfolio);
      setEditingIntroduction(false);
    } catch (err) {
      console.error("自己紹介の更新に失敗しました:", err);
      setError("自己紹介の更新に失敗しました。");
    }
  };

  const cancelEdit = (field: "title" | "image" | "introduction") => {
    if (!portfolio) return;

    switch (field) {
      case "title":
        setTempTitle(portfolio.title);
        setEditingTitle(false);
        break;
      case "image":
        setTempImage(portfolio.image);
        setEditingImage(false);
        break;
      case "introduction":
        setTempIntroduction(portfolio.introduction);
        setEditingIntroduction(false);
        break;
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!portfolio) {
    return <p>ロード中...</p>;
  }

  return (
    <section id="hero" className="mb-8">
      <div className="text-center">

        {editingTitle ? (
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 font-medium">
              📝ページ名
            </label>
            <input
              id="title"
              className="bg-gray-200 p-3 mb-2 border-gray-400 border-2 rounded-lg focus:border-red-500 w-full max-w-md"
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
            <div className="flex justify-center gap-2">
              <button
                onClick={handleUpdateTitle}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
              >
                保存
              </button>
              <button
                onClick={() => cancelEdit("title")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{portfolio.title}</h2>
            <button
              onClick={() => setEditingTitle(true)}
              className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
            >
              タイトルを編集
            </button>
          </div>
        )}

        <div className="grid items-center justify-center gap-4">

          <div className="mb-6">
            {editingImage ? (
              <div>
                <label htmlFor="image" className="block mb-2 font-medium">
                  📸画像URL
                </label>
                <input
                  id="image"
                  className="bg-gray-200 p-3 mb-2 border-gray-400 border-2 rounded-lg focus:border-red-500 w-full max-w-md"
                  type="text"
                  value={tempImage}
                  onChange={(e) => setTempImage(e.target.value)}
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleUpdateImage}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => cancelEdit("image")}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={portfolio.image}
                  alt="プロフィール画像"
                  width={128}
                  height={128}
                  className="rounded-full mx-auto mb-2"
                />
                <button
                  onClick={() => setEditingImage(true)}
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                >
                  画像を編集
                </button>
              </div>
            )}
          </div>


          <div className="mb-6">
            {editingIntroduction ? (
              <div>
                <label
                  htmlFor="introduction"
                  className="block mb-2 font-medium"
                >
                  ✎プロフィール
                </label>
                <textarea
                  id="introduction"
                  className="bg-gray-200 p-3 mb-2 border-gray-400 border-2 rounded-lg focus:border-red-500 w-full max-w-md h-32"
                  value={tempIntroduction}
                  onChange={(e) => setTempIntroduction(e.target.value)}
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleUpdateIntroduction}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => cancelEdit("introduction")}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-2">{portfolio.introduction}</p>
                <button
                  onClick={() => setEditingIntroduction(true)}
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
                >
                  自己紹介を編集
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
