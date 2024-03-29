import { useEffect, useState, useContext } from "react";
import { TourContext } from "../context/tour-context"
import ReactLoading from "react-loading";
import Header from "./Header.jsx";
import Results from "./Results.jsx";
import EventsMap from "./EventsMap.jsx";
import ArtistInfo from "./ArtistInfo.jsx";
import TTLogo from "/TT-logo.svg";

export default function HomePage (){

    const { visited, setVisited } = useContext(TourContext)

    const [firstLanding, setfirstLanding] = useState(true);

    const [eventsData, setEventsData] = useState(null)
    const [artistInfo, setArtistInfo] = useState(null)
    const [eventsDataLoaded, setEventsDataLoaded] = useState(false) 
    const [artistDataLoaded, setArtistDataLoaded] = useState(false)

    useEffect(() => {
        // Simulate loading data 
        const timeout = setTimeout(() => {
            setVisited(true)
        }, 3000)
        // Cleanup
        return () => {
          clearTimeout(timeout);
        };
      }, []);

    const defaultId = 'K8vZ91754g7'; // Replace for another artist

    useEffect(() => {
        const ticketmasterApiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
        const retrieveEventsDataFromArtistId = async (artistId) => {
            try {
                const response = await fetch(
                    `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${artistId}&apikey=${ticketmasterApiKey}&countryCode=US&size=199&sort=date,asc`
                    );
                if (!response.ok) {
                  throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEventsDataLoaded(true)
                setEventsData(data);
                
              } catch (error) {
                console.error("Error fetching events:", error);
                setEventsData([]);
              }
          }
        retrieveEventsDataFromArtistId(defaultId)

        const retrieveArtistInfo = async (artistId) => {
            try {
                const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/attractions/${artistId}.json?apikey=${ticketmasterApiKey}`
                )
                if (!response.ok) {
                throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setArtistDataLoaded(true)
                setArtistInfo(data);
                
            } catch (error) {
                console.error("Error fetching events:", error);
                setArtistInfo([]);
            }
        }
        retrieveArtistInfo(defaultId)

        return () => {
            // Clean up 
          };
          
    }, [])

    return (
        <div className="bg-black dark:bg-red-200">
            {!visited ? (
                <div className="h-screen bg-black grid place-content-center">
                    <img className="w-80 h-auto" src={TTLogo} alt="TT Logo" />
                </div>
            ) : (
                <div>
                    <Header/>
                    {eventsDataLoaded && artistDataLoaded ? (
                    <div>
                        <EventsMap gigs={eventsData._embedded ? eventsData._embedded.events : []} />
                        <div className="w-100 md:flex">
                            <div className="sm:w-full md:w-2/5">
                                <ArtistInfo artistInfo={artistInfo} />
                            </div>
                            <div className="w-full md:w-3/5 p-6">
                                <Results gigs={eventsData._embedded ? eventsData._embedded.events : [] } />
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className='h-screen grid place-content-center'>
                        <ReactLoading type="bars" color="#fff" />
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}