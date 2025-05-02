// AddSkills.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import SkillBox from "./AddSkillBox";
import { getSkills, createSkill } from "../../../api";
import { Skill } from "../../../types";


interface SkillsProps {
  portfolioId: number;
}

export default function AddSkills({ portfolioId }: SkillsProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<{
    category: string;
    explanation: string;
  }>({
    category: "",
    explanation: "",
  });
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSkills(portfolioId);
      setSkills(data);
    } catch (err) {
      console.error('スキルデータの取得に失敗しました:', err);
      setError('スキルデータの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [portfolioId]); 

  useEffect(() => {
    fetchSkills();
  }, [portfolioId, fetchSkills]);

  const handleCreateSkill = async () => {
    if (!newSkill.category || !newSkill.explanation ) return;

    try {
      await createSkill(portfolioId, {
        category: newSkill.category,
        explanation: newSkill.explanation,
      });
      setNewSkill({ category: "", explanation: "" });
      setIsAddingSkill(false);
      fetchSkills();
    } catch (err) {  
      console.error("スキルの追加に失敗しました:", err);
      setError("スキルの追加に失敗しました。");
    }
  };

  const handleSkillUpdated = () => {
    fetchSkills();
  };

  if (loading) return <p>ロード中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="skills" className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          onClick={() => setIsAddingSkill(!isAddingSkill)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
        >
          {isAddingSkill ? "キャンセル" : "skill追加"}
        </button>
      </div>

      {isAddingSkill && (
        <div className="border p-4 rounded-md mb-4 bg-gray-50">
          <h3 className="font-bold mb-2">NewSkill</h3>
          <div className="mb-3">
            <label htmlFor="category" className="block mb-1">
              カテゴリー:
            </label>
            <input
              id="category"
              type="text"
              className="w-full p-2 border rounded"
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="explanation" className="block mb-1">
              説明:
            </label>
            <textarea
              id="explanation"
              className="w-full p-2 border rounded"
              value={newSkill.explanation}
              onChange={(e) =>
                setNewSkill({ ...newSkill, explanation: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleCreateSkill}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
          >
            保存
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillBox
            key={skill.id}
            skill={skill}
            portfolioId={portfolioId}
            onSkillUpdated={handleSkillUpdated}
          />
        ))}
      </div>
    </section>
  );
}