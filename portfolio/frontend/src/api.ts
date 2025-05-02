import axios from 'axios';
import { Portfolio, Skill, SkillDetail } from './types'; 
import { auth } from '@/firebase'; 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


//UID
async function getIdToken(): Promise<string | null> {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('ID トークンの取得に失敗しました:', error);
    return null;
  }
}

export async function getUser() {
  const idToken = await getIdToken();
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken ? `Bearer ${idToken}` : '',
      },
    });
    if (!response.ok) {
      throw new Error(`データの取得に失敗しました: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('ポートフォリオデータの取得エラー:', error);
    throw error;
  }
}

export async function createUser(data: any) {
  const idToken = await getIdToken();
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken ? `Bearer ${idToken}` : '',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`ポートフォリオの作成に失敗しました: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('ポートフォリオ作成エラー:', error);
    throw error;
  }
}


// ポートフォリオ一覧を取得
export const getPortfolios = async () => {
  const response = await axios.get(`${API_BASE_URL}/portfolios`);
  return response.data as Skill[];
};

// ポートフォリオ詳細を取得
export const getPortfolioById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/portfolios/${id}`);
  console.log(response.data)
  return response.data;
};

// Workを取得
export const getWorks = async (portfolioId: number) => {
  const response = await axios.get(`${API_BASE_URL}/works/portfolio/${portfolioId}`);
  return response.data;
};

// skill一覧を取得
export const getSkills = async (portfolioId: number): Promise<Skill[]> => {
  const response = await axios.get(`${API_BASE_URL}/skills/portfolios/${portfolioId}`);
  return response.data as Skill[];
};

// skill詳細一覧を取得
export const getSkillDetails = async (skillId: number): Promise<SkillDetail[]> => {
  const response = await axios.get(`${API_BASE_URL}/skill-details/skill/${skillId}`);
  return response.data as SkillDetail[];
};

//ポートフォリオ作成
export const createPortfolio = async (portfolioData: { title: string; image: string; introduction: string }) => {
  const response = await axios.post(`${API_BASE_URL}/portfolios`, portfolioData);
  return response.data;
};

export const updatePortfolio = async (id: number, portfolioData: Partial<Portfolio>): Promise<Portfolio> => {
  try {
    const response = await axios.put<Portfolio>(`${API_BASE_URL}/portfolios/${id}`, portfolioData);
    return response.data;
  } catch (error) {
    console.error('ポートフォリオの更新に失敗しました:', error);
    throw error;
  }
};



//ポートフォリオ削除
export const deletePortfolio = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/portfolios/${id}`);
};

// workの作成
export const createWork = async (portfolioId: number, workData: { url: string }) => {
  const response = await axios.post(`${API_BASE_URL}/works`, {
    portfolio_id: portfolioId,
    url: workData.url
  });
  return response.data;
};


//workの更新
export const updateWork = async (id: number, data: { url: string }) => {
  const response = await axios.put(`${API_BASE_URL}/works/${id}`, data);
  return response.data;
};

// workの削除
export const deleteWork = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/works/${id}`);
  return response.data;
};

export const createSkill = async (portfolioId: number, skillData: { category: string; explanation: string }) => {
  const response = await axios.post(`${API_BASE_URL}/skills`, {
    portfolio_id: portfolioId,
    ...skillData
  });
  return response.data;
};

// skill更新
export const updateSkill = async (id: number, skillData: { category: string; explanation: string }) => {
  const response = await axios.put(`${API_BASE_URL}/skills/${id}`, skillData);
  return response.data;
};

// skill削除
export const deleteSkill = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/skills/${id}`);
};

// skill詳細作成
export const createSkillDetail = async (skillId: number, skillDetailData: SkillDetail) => {
  const {  ...detailDataWithoutId } = skillDetailData;

  const response = await axios.post(`${API_BASE_URL}/skill-details`, {
    ...detailDataWithoutId,
    years: skillDetailData.years,
  });
  return response.data;
};

// skill詳細更新
export const updateSkillDetail = async (
  id: number,
  skillDetailData: SkillDetail
) => {
  const response = await axios.put(
    `${API_BASE_URL}/skill-details/${id}`,
    {
      ...skillDetailData,
      years: skillDetailData.years, 
    }
  );
  return response.data;
};

// skill詳細削除
export const deleteSkillDetail = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/skill-details/${id}`);
    return true;
  } catch (error) {
    console.error('Failed to delete skill detail:', error);
    throw error; 
  }
};