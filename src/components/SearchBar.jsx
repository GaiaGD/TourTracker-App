import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { TourContext } from "../context/tour-context";

export default function SearchBar (){

    const divRef = useRef(null);

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [inputSubmit, setInputSubmit] = useState('');
    const [dropdownresults, setDropdownresults] = useState('');

    useEffect(() => {
        function handleClickOutside(event) {
          if (divRef.current && !divRef.current.contains(event.target)) {
            setDropdownresults([])
            setInputValue('')
          }
        }
        // Attach event listener to the document
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup the event listener on component unmount
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        const ticketmasterApiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
        if(inputSubmit != ''){
            const searchByKeyword = async (keywordToSearch) => {
                try {
                    const response = await fetch(
                    `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${ticketmasterApiKey}&keyword=${keywordToSearch}&locale=*&sort=relevance,desc&segmentId=KZFzniwnSyZfZ7v7nJ`
                    );
                    if (!response.ok) {
                    throw new Error("Failed to fetch artists");
                    }
                    const data = await response.json();
                    if(data._embedded){
                    console.log(`data embedded`)
                    setDropdownresults(data._embedded.attractions)
                    } else {
                    console.log(`data NOT embedded`)
                    setDropdownresults('No Results')
                    }
                    
                } catch (error) {
                    console.error("Error fetching events:", error);
                }
            }
            searchByKeyword(inputSubmit)
        }
    }, [inputSubmit])

    const handleChange = (event) => {
        setInputValue(event.target.value)
    };

    const handleSearch = (event) => {
        event.preventDefault()
        setInputSubmit(encodeURIComponent(inputValue))
    }

    return (
        <div className="w-full md:w-1/2 p-2 md:p-0" ref={divRef}>
            <form className="" onSubmit={handleSearch}>   
                <label htmlFor="default-search" className="mb-2 text-base font-medium sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block
                        w-full
                        p-4
                        ps-10
                        text-base
                        border-4
                        bg-black
                        dark:bg-red-200
                        focus:ring-blue-500
                        focus:border-blue-500
                        border-lime-300
                        dark:border-pink-600"
                        placeholder="Search Artists..."
                        value={inputValue} 
                        onChange={handleChange} 
                        required />
                    <button type="submit" className="
                    rounded-full
                    text-indigo-950
                    absolute
                    end-2.5
                    bottom-2.5
                    bg-violet-300
                    dark:bg-teal-500
                    dark:text-white
                    hover:bg-blue-800
                    focus:ring-4
                    focus:outline-none
                    focus:ring-blue-300
                    font-medium
                    text-base
                    px-4
                    py-2
                    hover:bg-violet-200
                    dark:focus:ring-blue-800"
                    >Search</button>
               </div>
            </form>

            {dropdownresults.length > 0 && dropdownresults !== "No Results" &&
                <div className="
                md:absolute
                z-10
                backdrop-blur-md
                md:bg-violet-200/60
                bg-black
                bg-opacity-60
                md:text-indigo-950
                text-violet-200
                w-100
                w-full
                md:w-[48%]
                max-h-[50vh]
                my-3
                overflow-scroll"
                >
                    {dropdownresults.map((result, i) => (
                        <div onClick={() => {
                                setInputValue('')
                                setDropdownresults('')
                                navigate(`/resultpage/${result.id}`)}
                            }
                            className="
                            cursor-pointer
                            p-6
                            border-b
                            md:border-indigo-950
                            border-lime-300
                            dark:bg-pink-600
                            last:border-0
                            hover:bg-lime-300"
                            key={i}>
                            <p>{result.name}</p>
                        </div>
                    ))}
                </div>
            }

            { dropdownresults === "No Results" &&
                <div className="
                md:absolute
                z-10
                backdrop-blur-md
                md:bg-violet-200
                bg-black
                bg-opacity-60
                text-indigo-950
                w-100
                w-full
                md:w-[48%]
                max-h-[50vh]
                my-3
                overflow-scroll"
                >
                    <div onClick={() => {setDropdownresults([]), setInputValue('')}} className="cursor-pointer
                        cursor-pointer
                        p-6
                        border-b
                        border-fuchsia-950
                        last:border-0
                        hover:bg-white/40"
                    >
                       <p>No artist found</p>
                    </div>
                </div>
            }

        </div>
    )
}