import { ReactNode } from 'react'
import {IArticleTag} from "../../types/article";

export interface TagBadgeProp {
  children?: ReactNode,
  tag: IArticleTag
}
