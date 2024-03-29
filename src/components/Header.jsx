
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar"
import TTLogo from "/TT-logo.svg";
import { useContext } from 'react';
import { TourContext } from '../context/tour-context';

export default function Header() {

    const {isDarkTheme, toggleTheme} = useContext(TourContext)

    return (
        <div className="md:h-24 h-auto w-full bg-black dark:bg-red-200 md:flex justify-between items-center md:px-8">
                <Link className='flex items-center justify-center' to="/">
                    <img className="w-44 h-auto my-4" src={TTLogo} />
                </Link>
                <div className='flex justify-center'>
                    <p className='px-6'>🍋</p>
                    <label className={`inline-flex items-center cursor-pointer`}>
                        <input onClick={toggleTheme} type="checkbox" value="" className="sr-only peer" />
                        <div className="relative
                        w-11
                        h-6
                        bg-gray-200
                        peer-focus:outline-none
                        peer-focus:ring-4
                        peer-focus:ring-blue-300
                        dark:peer-focus:ring-red-800
                        rounded-full
                        peer
                        dark:bg-gray-700
                        peer-checked:after:translate-x-full
                        rtl:peer-checked:after:-translate-x-full
                        peer-checked:after:border-white
                        after:content-['']
                        after:absolute
                        after:top-[2px]
                        after:start-[2px]
                        after:bg-white
                        after:border-gray-300
                        after:border
                        after:rounded-full
                        after:h-5
                        after:w-5
                        after:transition-all
                        dark:border-gray-600
                        peer-checked:bg-slate-600"></div>
                    </label>
                    <p className='px-6'>🍓</p>
                </div>

                <SearchBar/>
        </div>
    )
}