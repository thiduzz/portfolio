import React, {PropsWithChildren} from 'react'
import {LoadMoreButtonProp} from "@components/LoadMoreButton/LoadMoreButton.types";
import {FaCircleNotch} from 'react-icons/fa'

const LoadMoreButton = ({ loading, children, onClick }: PropsWithChildren<LoadMoreButtonProp>) => {

    return <button className={`border-2 border-green-500 rounded p-3 cursor-pointer duration-300 w-48 text-center w-full flex flex-row justify-center shadow-md ${(!loading && `hover:border-gray-900  hover:scale-110`)}`} onClick={onClick}>
        {!loading && children}
        {loading && <FaCircleNotch className="fa-spin text-center text-green-500" alignmentBaseline="central" size={24} />}
    </button>
}

export default LoadMoreButton