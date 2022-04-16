import React, {ReactNode} from 'react'
import { TopBarProps } from './TopBar.types'
import Logo from "../Logo";
import Link from "next/link";


const TopBar = ({ navigation: navigationProp, menu: menuProp }: TopBarProps) => {

    let navigation: ReactNode[] = [<Logo key="0"/>]
    if (navigationProp){
        navigation = navigationProp.override ? navigationProp.items : [...navigation, ...navigationProp.items]
    }
    let menu: ReactNode[] = [
        <Link key="1" href='/' passHref>Home</Link>,
        <Link key="2" href='/articles' passHref>Articles</Link>,
        <Link key="3" href='/about' passHref>About</Link>
    ]
    if (menuProp){
        menu = menuProp.override ? menuProp.items : [...menu, ...menuProp.items]
    }
    return <header className='bg-white py-4 fixed w-full z-10'>
        <div className="container mx-auto ">
            <div className='flex justify-between gap-x-2.5'>
                <nav>
                    {navigation.map(item => item)}
                </nav>
                <menu>
                    <div className='flex flex-row gap-x-16'>
                        {menu?.map(item => item)}
                    </div>
                </menu>
            </div>
        </div>
    </header>
}

export default TopBar