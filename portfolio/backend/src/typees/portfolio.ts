import { work } from './work';
import { skill } from './skill';

export interface portfolio {
    id: number;
    title: string | null;
    image: string | null;
    introduction: string | null;
    works?: work[];
    skills?: skill[];
  }
  
 