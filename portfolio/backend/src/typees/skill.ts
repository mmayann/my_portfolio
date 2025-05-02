import { portfolio } from './portfolio';
import { skillDetail } from './skilldetail';

export interface skill {
    id: number;
    portfolio_id: number;
    category: string | null;
    explanation: string | null;
    portfolio?: portfolio;
    skillDetails?: skillDetail[];
  }