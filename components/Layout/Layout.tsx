import React from 'react'
import TopBar from '../TopBar'
import Footer from "../Footer";
import { LayoutProps } from './Layout.types'
import styles from '../../styles/Layout.module.css'

const Layout = ({ children, topBar, footer }: LayoutProps) => {
 
  return (<>
      <div className={styles.container}>
        {topBar ?? <TopBar/>}
        <main  className={styles.main}>{children}</main>
        {footer ?? <Footer/>}
      </div>
    </>)
}


export default Layout