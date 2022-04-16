import { ReactNode } from 'react'
import {IArticle} from "../../types/article";

export interface ArticleItemProp {
  children?: ReactNode,
  article: IArticle
}
