import { ReactNode } from 'react'
import {ILinkedArticle} from "@local-types/article";

export interface ArticleLinkProp {
  children?: ReactNode,
  article: ILinkedArticle
  position: 'left' | 'right'
}
