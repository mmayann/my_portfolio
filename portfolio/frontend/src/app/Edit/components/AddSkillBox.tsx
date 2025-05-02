"use client";
import { useState, useEffect } from "react";
import {
  getSkillDetails,
  updateSkill,
  deleteSkill,
  createSkillDetail,
  updateSkillDetail,
  deleteSkillDetail,
} from "../../../api";
import { Skill, SkillDetail } from "../../../types";

interface SkillBoxProps {
  portfolioId: number;
  skill: Skill;
  onSkillUpdated: () => void;
}

export default function SkillBox({
  skill,
  onSkillUpdated,
}: SkillBoxProps) {
  const [skillDetails, setSkillDetails] = useState<SkillDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkill, setEditedSkill] = useState<Skill>({ ...skill });
  const [isAddingDetail, setIsAddingDetail] = useState(false);
  const [newDetail, setNewDetail] = useState<{
    lang: string;
    star: number;
    years: string;
  }>({
    lang: "",
    star: 1,
    years: "",
  });
  const [editingDetails, setEditingDetails] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchSkillDetails = async () => {
    setLoading(true);
    try {
      const data = await getSkillDetails(skill.id);
      setSkillDetails(data);
    } catch (err) {
      console.error("スキル詳細データの取得に失敗しました:", err);
      setError("スキル詳細データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill.id]);

  const handleUpdateSkill = async () => {
    try {
      await updateSkill(skill.id, editedSkill);
      setIsEditing(false);
      onSkillUpdated();
    } catch (err) {
      console.error("スキルの更新に失敗しました:", err);
      setError("スキルの更新に失敗しました。");
    }
  };

  const handleDeleteSkill = async () => {
    if (!confirm("このスキルを削除してもよろしいですか？")) return;

    try {
      await deleteSkill(skill.id);
      onSkillUpdated();
    } catch (err) {
      console.error("スキルの削除に失敗しました:", err);
      setError("スキルの削除に失敗しました。");
    }
  };

  const handleAddDetail = async () => {
    if (!newDetail.lang || !newDetail.years) {
      setError("言語と経験年数を入力してください。");
      return;
    }

    try {
      await createSkillDetail(skill.id, {
        ...newDetail,
        id: 0,
        skill_id: skill.id,
        years: newDetail.years, 
      });
      setNewDetail({ lang: "", star: 1, years: "" });
      setIsAddingDetail(false);
      fetchSkillDetails();
    } catch (err) {
      console.error("スキル詳細の追加に失敗しました:", err);
      setError("スキル詳細の追加に失敗しました。");
    }
  };

  const handleUpdateDetail = async (detail: SkillDetail) => {
    try {
      await updateSkillDetail(detail.id, detail);
      setEditingDetails({ ...editingDetails, [detail.id]: false });
      fetchSkillDetails();
    } catch (err) {
      console.error("スキル詳細の更新に失敗しました:", err);
      setError("スキル詳細の更新に失敗しました。");
    }
  };

  const handleDeleteDetail = async (detailId: number) => {
    try {
      await deleteSkillDetail(detailId);
      fetchSkillDetails();
    } catch (err) {
      console.error("スキル詳細の削除に失敗しました:", err);
      setError("スキル詳細の削除に失敗しました。");
    }
  };

  const toggleEditDetail = (detailId: number) => {
    setEditingDetails({
      ...editingDetails,
      [detailId]: !editingDetails[detailId],
    });
  };

  const updateDetailField = (
    detail: SkillDetail,
    field: keyof SkillDetail,
    value: string | number
  ) => {
    const updatedDetails = skillDetails.map((d) =>
      d.id === detail.id ? { ...d, [field]: value } : d
    );
    setSkillDetails(updatedDetails);
  };

  if (loading) return <div className="border p-4 rounded-md">ロード中...</div>;
  if (error)
    return <div className="border p-4 rounded-md text-red-500">{error}</div>;

  return (
    <div className="border p-4 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      {isEditing ? (
        <>
          <div className="mb-3">
            <label
              htmlFor={`category-${skill.id}`}
              className="block font-bold mb-1"
            >
              カテゴリー:
            </label>
            <input
              id={`category-${skill.id}`}
              type="text"
              className="w-full p-2 border rounded"
              value={editedSkill.category}
              onChange={(e) =>
                setEditedSkill({ ...editedSkill, category: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor={`explanation-${skill.id}`}
              className="block font-bold mb-1"
            >
              説明:
            </label>
            <textarea
              id={`explanation-${skill.id}`}
              className="w-full p-2 border rounded"
              value={editedSkill.explanation}
              onChange={(e) =>
                setEditedSkill({ ...editedSkill, explanation: e.target.value })
              }
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateSkill}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              保存
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{skill.category}</h3>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs"
              >
                編集
              </button>
              <button
                onClick={handleDeleteSkill}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
              >
                削除
              </button>
            </div>
          </div>
          <p className="text-gray-700 mb-3">{skill.explanation}</p>
        </>
      )}

      <div className="mt-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold">技術詳細</h4>
          <button
            onClick={() => setIsAddingDetail(!isAddingDetail)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs"
          >
            {isAddingDetail ? "キャンセル" : "詳細追加"}
          </button>
        </div>

        {isAddingDetail && (
          <div className="mb-3 p-2 bg-gray-50 rounded">
            <div className="mb-2">
              <label htmlFor={`new-lang-${skill.id}`} className="block text-sm">
                言語/フレームワーク:
              </label>
              <input
                id={`new-lang-${skill.id}`}
                type="text"
                className="w-full p-1 border rounded text-sm"
                value={newDetail.lang}
                onChange={(e) =>
                  setNewDetail({ ...newDetail, lang: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`new-year-${skill.id}`} className="block text-sm">
                経験年数:
              </label>
              <input
                id={`new-year-${skill.id}`}
                type="text"
                className="w-full p-1 border rounded text-sm"
                value={newDetail.years}
                onChange={(e) =>
                  setNewDetail({ ...newDetail, years: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`new-star-${skill.id}`} className="block text-sm">
                評価 (1-5):
              </label>
              <input
                id={`new-star-${skill.id}`}
                type="number"
                min="1"
                max="5"
                className="w-full p-1 border rounded text-sm"
                value={newDetail.star}
                onChange={(e) =>
                  setNewDetail({
                    ...newDetail,
                    star: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
            <button
              onClick={handleAddDetail}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs"
            >
              追加
            </button>
          </div>
        )}

        <ul className="space-y-2">
          {skillDetails.map((detail) => (
            <li key={detail.id} className="flex items-center justify-between">
              {editingDetails[detail.id] ? (
                <div className="flex-1 flex items-center space-x-2">


                  <input
                    type="text"
                    className="p-1 border rounded text-sm flex-grow"
                    value={detail.lang}
                    onChange={(e) =>
                      updateDetailField(detail, "lang", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`new-year-${skill.id}`}
                    className="block text-sm"
                  >
                    経験年数:
                  </label>
                  <input
                    type="text"
                    className="p-1 border rounded text-sm w-12"
                    value={detail.years}
                    onChange={(e) =>
                      updateDetailField(detail, "years", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="p-1 border rounded text-sm w-12"
                    value={detail.star}
                    onChange={(e) =>
                      updateDetailField(
                        detail,
                        "star",
                        parseInt(e.target.value) || 1
                      )
                    }
                  />
                  <button
                    onClick={() => handleUpdateDetail(detail)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => toggleEditDetail(detail.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    キャンセル
                  </button>
                </div>
              ) : (
                <>
                  <span>
                    {detail.lang}: {renderStars(detail.star)} {detail.years}年
                  </span>
                  <div>
                    <button
                      onClick={() => toggleEditDetail(detail.id)}
                      className="text-blue-500 hover:text-blue-700 text-xs mx-1"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteDetail(detail.id)}
                      className="text-red-500 hover:text-red-700 text-xs mx-1"
                    >
                      削除
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {skillDetails.length === 0 && !isAddingDetail && (
          <p className="text-gray-500 text-sm italic">詳細がありません</p>
        )}
      </div>
    </div>
  );
}

// 星評価を表示するヘルパー関数
function renderStars(count: number) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}
