import React, { JSX } from "react";

const RatingCriteria: React.FC = () => {
  const ratingCriteriaData = [
    {
      value: 1,
      description: "基礎概念や文法を学習中（書籍、公式ドキュメント）。",
    },
    {
      value: 2,
      description:
        "基本的な文法・概念を理解。簡単なプログラムやスクリプト作成が可能。",
    },
    { value: 3, description: "プロジェクトやタスクを複数完了経験あり。" },
    {
      value: 4,
      description: "複数プロジェクト経験あり。深い理解と実装が可能。",
    },
    { value: 5, description: "ユーザーがいる実用的なものをデプロイ経験あり。" },
  ];

  const renderStars = (value: number): JSX.Element[] => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= value ? "#ffc107" : "#ccc",
            fontSize: "1.2em",
            marginRight: "0.2em",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="mb-20 grid items-center justify-center">
      <h4 className="text-lg mb-5 text-center">★の評価基準</h4>
      <p className="text-center text-sm mb-1">
        実務未経験のため、独自の評価基準を設けましたのでご参照ください。
      </p>
      <table className="rating-criteria-table text-sm border-t border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2">★の数</th>
            <th>評価内容</th>
          </tr>
        </thead>
        <tbody>
          {ratingCriteriaData.map((item, index) => (
            <tr key={index}>
              <td className="rating-value pl-5">{renderStars(item.value)}</td>
              <td className="rating-description pl-3 pr-5">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RatingCriteria;
