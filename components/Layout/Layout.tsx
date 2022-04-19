import React from 'react'
import TopBar from '../TopBar'
import Footer from "../Footer";
import { LayoutProps } from './Layout.types'

const Layout = ({ children, topBar, footer }: LayoutProps) => {
 
  return (<>
      <div className="base-container">
        {topBar ?? <TopBar/>}
        <main className="base-main">{children}</main>
        {footer ?? <Footer/>}
      </div>
    </>)
}


export default Layout