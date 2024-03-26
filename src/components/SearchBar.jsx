import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
        console.log(`inputSubmit before:`, inputSubmit)
        if(inputSubmit != ''){
            const searchByKeyword = async (keywordToSearch) => {
                try {
                    const response = await fetch(
                    `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${ticketmasterApiKey}&keyword=${keywordToSearch}&locale=*&sort=relevance,desc`
                    );
                    if (!response.ok) {
                    throw new Error("Failed to fetch artists");
                    }
                    const data = await response.json();
                    console.log(data)
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

    // useEffect(() => {
    //     if(artistIdUrl != ''){
    //         navigate(`/resultpage/${artistIdUrl}`)
    //     }
    // }, [navigate, artistIdUrl])

    const handleChange = (event) => {
        setInputValue(event.target.value)
    };

    const handleSearch = (event) => {
        event.preventDefault()
        setInputSubmit(encodeURIComponent(inputValue))
        console.log('Search submitted with value:', encodeURIComponent(inputValue))
    }

    return (
        <div ref={divRef}>
            <form className="" onSubmit={handleSearch}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-lime-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border-4 rounded-lg bg-black focus:ring-blue-500 focus:border-blue-500 border-lime-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Artists..."
                        value={inputValue} 
                        onChange={handleChange} 
                        required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-fuchsia-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hover:bg-fuchsia-900 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            

            {dropdownresults.length > 0 && dropdownresults !== "No Results" &&
                <div className="absolute backdrop-blur-md bg-lime-300 bg-opacity-60 text-fuchsia-950 rounded-lg w-[56%] max-h-[50vh] m-3 overflow-scroll">
                    {dropdownresults.map((result, i) => (
                        <div
                            onClick={() =>
                                {
                                setInputValue('')
                                setDropdownresults('')
                                navigate(`/resultpage/${result.id}`)}
                            }
                            className="cursor-pointer p-6 border-b border-fuchsia-950 last:border-0 hover:bg-lime-300/40" key={i}>
                            <p>{result.name}</p>
                        </div>
                    ))}
                </div>
            }

            { dropdownresults === "No Results" &&
                <div className="absolute backdrop-blur-md bg-lime-300 bg-opacity-40 text-fuchsia-950 rounded-lg w-[56%] max-h-[50vh] m-3 overflow-scroll">
                    <div onClick={() => {setDropdownresults([]), setInputValue('')}} className="cursor-pointer p-6 border-b border-fuchsia-950 last:border-0 hover:bg-lime-300/40">
                        <p>No artist found</p>
                    </div>
                </div>
            }

        </div>
    )
}