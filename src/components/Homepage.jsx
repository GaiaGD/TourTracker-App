import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Results from "./Results.jsx";
import EventsMap from "./EventsMap.jsx";
import ArtistInfo from "./ArtistInfo.jsx";
import SearchBar from "./SearchBar.jsx"
import TTLogo from "../../public/TT-logo.svg";

export default function HomePage (){
    const [firstLanding, setfirstLanding] = useState(true);
    const location = useLocation();

    const [eventsData, setEventsData] = useState([]);
    const [artistInfo, setArtistInfo] = useState([]);

    const defaultId = 'K8vZ917_Su0'; // Replace for another artist

    useEffect(() => {
        const ticketmasterApiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
        const functionToRetrieveEventsDataFromArtistId = async (artistId) => {
            try {
                const response = await fetch(
                  `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${artistId}&apikey=${ticketmasterApiKey}&countryCode=US&sort=date,asc`
                );
                if (!response.ok) {
                  throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEventsData(data);
                
              } catch (error) {
                console.error("Error fetching events:", error);
                setEventsData([]);
              }
          }
        functionToRetrieveEventsDataFromArtistId(defaultId)

        const functionToRetrieveArtistInfo = async (artistId) => {
            try {
                const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/attractions/${artistId}.json?apikey=${ticketmasterApiKey}`
                )
                if (!response.ok) {
                throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setArtistInfo(data);
                
            } catch (error) {
                console.error("Error fetching events:", error);
                setArtistInfo([]);
            }
        }
        functionToRetrieveArtistInfo(defaultId)

        return () => {
            // Clean up 
          };
          
    }, [])

    useEffect(() => {
        // Check if the location pathname is the homepage
        const isHomePage = location.pathname === "/";
        // If not navigating back to the homepage, setfirstLanding to false
        if (!isHomePage) {
            setfirstLanding(false)
        }
        // Clean up 
        return () => {
        };
    }, [location]);

    useEffect(() => {
        // Simulate loading data 
        const timeout = setTimeout(() => {
            setfirstLanding(false)
        }, 3000)
        // Cleanup
        return () => {
          clearTimeout(timeout);
        };
      }, []);

    return (
        <div>
            { firstLanding ?
                (
                    <div className="h-screen bg-black grid place-content-center">
                        <img className="w-80 h-auto" src={TTLogo} />
                    </div>
                ) : (
                    <div>
                        <Header/>
                        <EventsMap gigs={eventsData._embedded ? eventsData._embedded.events : []} />
                        <div className="w-100 md:flex">
                            <div className="sm:w-full md:w-2/5">
                            <div className="block md:hidden mt-6 mx-2"><SearchBar/></div>
                                <ArtistInfo artistInfo={artistInfo} />
                            </div>
                            <div className="w-full md:w-3/5 p-6">
                                {/* <div className="hidden md:block"><SearchBar/></div> */}
                                <Results gigs={eventsData._embedded ? eventsData._embedded.events : [] } />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}