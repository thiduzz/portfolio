import Link from 'next/link'
import React from 'react'
import {FiChevronRight, FiAtSign} from 'react-icons/fi'

const Logo = () => {
  const latestVersion = process.env.NEXT_PUBLIC_RELEASE_TAG ?? 'v0.0.0'
  return <div className="text-lg cursor-pointer text-bold flex items-center">
        <Link href="/" passHref>
          <>
            <span className="animate-blink text-green-500 flex flex-row items-center">
            <FiChevronRight/>_
            </span>
              <Link href="/">
                  <span className="text-gray-800">
                  thiago-mello
                  </span>
              </Link>
          </>
        </Link>
        <span className='text-green-500'><FiAtSign className="text-green-500"/></span>

        <Link href="https://github.com/thiduzz/portfolio/releases" passHref>
          <a target="_blank">
            <span className='text-green-500'>{latestVersion}</span>
          </a>
        </Link>
    </div>
}

export default Logo