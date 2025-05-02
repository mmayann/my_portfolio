import { portfolio } from './portfolio';

export interface work {
    id: number;
    portfolio_id: number;
    url: string | null;
    portfolio?: portfolio;
  }