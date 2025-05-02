"use client";

import { useSearchParams } from "next/navigation";
import { getSkills, getSkillDetails } from "../../../api";
import { Skill, SkillDetail, SkillBoxItem } from "../../../types";
import { SkillBox } from "./SkillBox";
import { useEffect, useState } from "react";

export default function Skills() {
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("id") || "1";

  const [skillBoxes, setSkillBoxes] = useState<
    { title: string; description: string; items: SkillBoxItem[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkillsData() {
      const skills: Skill[] = await getSkills(Number(portfolioId));
      return skills.map((skill) => ({
        title: skill.category,
        description: skill.explanation,
        items: [] as SkillBoxItem[],
      }));
    }

    async function fetchSkillDetailsData(
      skills: Skill[],
      skillBoxes: { title: string; description: string; items: SkillBoxItem[] }[]
    ) {
      for (const skill of skills) {
        const skillDetails: SkillDetail[] = await getSkillDetails(skill.id);
        for (const detail of skillDetails) {
          const skillBox = skillBoxes.find(
            (box) => box.title === skill.category
          );
          skillBox?.items.push({
            name: detail.lang,
            years: detail.years || "", // yearsプロパティの初期値を設定
            stars: detail.star,
          });
        }
      }
      return skillBoxes;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let skillBoxes = await fetchSkillsData();
        skillBoxes = await fetchSkillDetailsData(
          await getSkills(Number(portfolioId)),
          skillBoxes
        );
        setSkillBoxes(skillBoxes);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`データの取得に失敗しました: ${err.message}`);
        } else {
          setError("データの取得に失敗しました: 不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [portfolioId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="skills" className="mt-20 ">
      <h2 className="text-3xl font-bold mb-20 mt-20 text-center">Skill</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {skillBoxes.map((skillBox, index) => (
          <SkillBox
            key={index}
            title={skillBox.title}
            description={skillBox.description}
            items={skillBox.items}
          />
        ))}
      </div>
    </section>
  );
}