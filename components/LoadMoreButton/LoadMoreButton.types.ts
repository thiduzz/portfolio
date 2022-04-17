import {MouseEventHandler, ReactNode} from 'react'

export interface LoadMoreButtonProp {
  children?: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
  loading: boolean
}
