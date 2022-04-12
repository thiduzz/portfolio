import Link from 'next/link'
import React from 'react'
import {FiChevronRight, FiAtSign} from 'react-icons/fi'

const Logo = () => {
  return <Link href="/">
    <div className='text-lg cursor-pointer text-bold flex items-center'>
      <span className='animate-blink text-green-500 flex flex-row items-center'><FiChevronRight></FiChevronRight>_</span>thiago mello <span className='text-green-500'><FiAtSign/></span><Link href="https://github.com/thiduzz/portfolio/releases"><span className='text-green-500'>1.0.0</span></Link>
    </div>
  </Link>
}

export default Logo