import { useState,useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header.jsx";
import Results from "./Results.jsx";
import EventsMap from "./EventsMap.jsx";
import ArtistInfo from "./ArtistInfo.jsx";
import SearchBar from "./SearchBar.jsx"

export default function ResultsPage (){

    const { artistId } = useParams();

    const [eventsData, setEventsData] = useState([]);
    const [artistInfo, setArtistInfo] = useState([]);

    const [artistIdParam, setArtistIdParam] = useState('');

    useEffect(() => {
      // helps refresh page (router is lazy)
      setArtistIdParam(artistId);
    }, [artistId]);
  

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
        functionToRetrieveEventsDataFromArtistId(artistId)

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
        functionToRetrieveArtistInfo(artistId)

    }, [artistId])

    return (
        <div>
            <Header/>
            <EventsMap  gigs={eventsData._embedded ? eventsData._embedded.events : []} />
            <div className="w-100 md:flex">
              <div className="sm:w-full md:w-2/5">
              {/* <div className="block md:hidden mt-6 mx-2"><SearchBar/></div> */}
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