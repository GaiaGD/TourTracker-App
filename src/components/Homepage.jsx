import { useContext, useEffect, useState } from "react";
import { TourContext } from "../context/tour-context.jsx"
import Results from "./Results.jsx";
import EventsMap from "./EventsMap.jsx";
import ArtistInfo from "./ArtistInfo.jsx";
import SearchBar from "./SearchBar.jsx"

export default function HomePage (){

    const ticketmasterApiKey = import.meta.env.VITE_TICKETMASTER_API_KEY

    const [eventsData, setEventsData] = useState([]);
    const [artistInfo, setArtistInfo] = useState([]);

    const defaultId = 'K8vZ9174l1f'; // Replace for another artist

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

    return (
        <div>
            <EventsMap  gigs={eventsData._embedded ? eventsData._embedded.events : []} />
            <div className="w-100 md:flex">
            <div>
                <div className="sm:w-full md:w-2/5">
                    <ArtistInfo artistInfo={artistInfo} />
                </div>
                <div className="w-full md:w-3/5 p-6">
                    <SearchBar />
                </div>
            </div>
              <div className="w-full md:w-3/5 p-6">
                <Results gigs={eventsData._embedded ? eventsData._embedded.events : [] } />
              </div>
            </div>
        </div>
    )
}