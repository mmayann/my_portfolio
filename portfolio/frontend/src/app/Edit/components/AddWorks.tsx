"use client";
import { useState, useEffect, useCallback } from "react";
import { getWorks, updateWork, deleteWork, createWork } from "../../../api";
import { Work } from "../../../types";

interface WorksProps {
  portfolioId: number;
}

export default function AddWorks({ portfolioId }: WorksProps) {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newWorkUrl, setNewWorkUrl] = useState("");
  const [editingWorks, setEditingWorks] = useState<{ [key: number]: string }>(
    {}
  );

  const fetchWorks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = (await getWorks(portfolioId)) as Work[];
      setWorks(data);

      const initialEditState: { [key: number]: string } = {};
      data.forEach((work) => {
        initialEditState[work.id] = work.url;
      });
      setEditingWorks(initialEditState);
    } catch (err) {
      console.error("作品データの取得に失敗しました:", err);
      setError("作品データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    fetchWorks();
  }, [portfolioId, fetchWorks]);

  const handleUpdateWork = async (id: number) => {
    try {
      await updateWork(id, { url: editingWorks[id] });
      fetchWorks();
    } catch (err) {
      console.error("作品の更新に失敗しました:", err);
      setError("作品の更新に失敗しました。");
    }
  };

  const handleEditChange = (id: number, value: string) => {
    setEditingWorks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteWork = async (id: number) => {
    try {
      await deleteWork(id);
      fetchWorks();
    } catch (err) {
      console.error("作品の削除に失敗しました:", err);
      setError("作品の削除に失敗しました。");
    }
  };

  const handleCreateWork = async () => {
    if (!newWorkUrl.trim()) return;

    try {
      await createWork(portfolioId, { url: newWorkUrl });
      setNewWorkUrl("");
      fetchWorks();
    } catch (err) {
      console.error("作品の追加に失敗しました:", err);
      setError("作品の追加に失敗しました。");
    }
  };

  if (loading) return <p>ロード中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="works" className="mb-8">
      <h2>Works</h2>
      <ul className="space-y-3">
        {works.map((work) => (
          <li key={work.id} className="flex items-center gap-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              value={editingWorks[work.id] || ""}
              onChange={(e) => handleEditChange(work.id, e.target.value)}
            />
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => handleUpdateWork(work.id)}
            >
              更新
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeleteWork(work.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          value={newWorkUrl}
          onChange={(e) => setNewWorkUrl(e.target.value)}
          placeholder="新しい作品のURL"
        />
        <button
          className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={handleCreateWork}
        >
          追加
        </button>
      </div>
    </section>
  );
}
