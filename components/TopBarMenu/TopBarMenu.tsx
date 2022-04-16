import React, {ReactNode, useState} from 'react'
import { TopBarProps } from './TopBarMenu.types'
import Link from "next/link";
import {FiMenu, FiX} from "react-icons/fi";


const TopBarMenu = ({  menu: menuProp }: TopBarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    let menu: ReactNode[] = [
        <Link key="1" href='/' passHref>Home</Link>,
        <Link key="2" href='/articles' passHref>Articles</Link>,
        <Link key="3" href='/about' passHref>About</Link>
    ]
    if (menuProp){
        menu = menuProp.override ? menuProp.items : [...menu, ...menuProp.items]
    }

    return <>
        <div className="hidden lg:block">
            <nav>
                <div className='flex flex-row gap-x-16'>
                    {menu?.map(item => item)}
                </div>
            </nav>
        </div>
        <div className="block lg:hidden">
            <div className="flex flex-row justify-end">
                {!isOpen && <button onClick={handleOpen}><FiMenu className="text-gray-900 text-2xl"/></button>}
            </div>
            {isOpen && <menu className="h-screen w-screen bg-black/50 absolute inset-0 flex flex-col items-end z-20">
                <div className="bg-white h-screen w-1/2">
                    <div className="p-5">
                        <button onClick={handleClose}><FiX className="text-gray-900 text-4xl"/></button>
                    </div>
                    <div className='flex flex-row gap-x-16'>
                        <ul>
                            {menu?.map((item,index) => <li key={index} className="w-full p-5 text-2xl">{item}</li>)}
                        </ul>
                    </div>
                </div>
            </menu>}
        </div>
    </>
}

export default TopBarMenu