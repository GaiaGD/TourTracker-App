import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";

import Header from "./Header.jsx";
import Results from "./Results.jsx";
import EventsMap from "./EventsMap.jsx";
import ArtistInfo from "./ArtistInfo.jsx";

export default function ResultsPage (){

    const { artistId } = useParams();

    const [eventsData, setEventsData] = useState(null)
    const [artistInfo, setArtistInfo] = useState(null)
    const [eventsDataLoaded, setEventsDataLoaded] = useState(false) 
    const [artistDataLoaded, setArtistDataLoaded] = useState(false) 

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
            setEventsDataLoaded(true)
            setEventsData(data);
            
          } catch (error) {
            console.error("Error fetching events:", error);
            setEventsData([]);
          }
      }

    setTimeout(() => {
      functionToRetrieveEventsDataFromArtistId(artistId)
    }, 1000)
    
    const functionToRetrieveArtistInfo = async (artistId) => {
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

    setTimeout(() => {
      functionToRetrieveArtistInfo(artistId)
    }, 1000)

}, [artistId])

    return (
      <div>
        <Header/>
          {eventsDataLoaded ? (
              <div>
                  <EventsMap gigs={eventsData._embedded ? eventsData._embedded.events : []} />
                  <div className="w-100 md:flex">
                      <div className="sm:w-full md:w-2/5">
                          {artistDataLoaded ? (
                              <ArtistInfo artistInfo={artistInfo} />
                          ) : (
                              <div>
                                <ReactLoading type="spin" color="#fff" />
                              </div>
                          )}
                      </div>
                      <div className="w-full md:w-3/5 p-6">
                          <Results gigs={eventsData._embedded ? eventsData._embedded.events : [] } />
                      </div>
                  </div>
              </div>
          ) : (
            <div className='h-[90vh] grid place-content-center'>
              <ReactLoading type="bubbles" color="#fff" />
            </div>
          )}
      </div>
    )
}