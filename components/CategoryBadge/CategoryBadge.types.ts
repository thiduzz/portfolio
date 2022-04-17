import { ReactNode } from 'react'
import {IArticleCategory} from "../../types/article";

export interface CategoryBadgeProp {
  children?: ReactNode,
  category: IArticleCategory
}
