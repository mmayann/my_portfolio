import { portfolio } from "./portfolio";

export interface User {
    userId: number;
    firebaseUid: string;
    email?: string | null;
    name?: string | null;
    portfolios: portfolio[]; // Portfolio モデルに対応する型が別途必要です
  }