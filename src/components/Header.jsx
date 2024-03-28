import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar"
import TTLogo from "/TT-logo.svg";

export default function Header() {
    return (
        <div className="md:h-24 h-auto w-full bg-black md:flex justify-between items-center md:px-8">
                <Link className='flex items-center justify-center' to="/">
                    <img className="w-44 h-auto my-4" src={TTLogo} />
                </Link>
                <SearchBar/>
        </div>
    )
}