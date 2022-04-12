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
        <Link key="1" href='/'>Home</Link>,
        <Link key="2" href='/article'>Articles</Link>,
        <Link key="3" href='/about'>About</Link>
    ]
    if (menuProp){
        menu = menuProp.override ? menuProp.items : [...menu, ...menuProp.items]
    }
    return <header className='bg-transparent py-4 container mx-auto w-full'>
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
    </header>
}

export default TopBar