import { skill } from './skill';

export interface skillDetail {
    id: number;
    skill_id: number;
    lang: string | null;
    star: number | null;
    skill?: skill;
  }