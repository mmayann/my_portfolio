// src/types.ts
export interface Portfolio {
  id: number;
  title: string;
  image: string;
  introduction: string;
}

export interface Work {
  id: number;
  portfolio_id: number;
  url: string;
}

export interface Skill {
  id: number;
  portfolio_id: number;
  category: string;
  explanation: string;
  years: string;
}


export interface SkillDetail {
  id: number;
  skill_id: number;
  lang: string;
  star: number;
  years: string;
}

export interface SkillBoxItem {
  name: string;
  years: string | null | undefined;
  stars: string | number | null | undefined;
}