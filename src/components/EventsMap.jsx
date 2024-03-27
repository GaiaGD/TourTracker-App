import { useContext, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { TourContext } from "../context/tour-context.jsx"

function EventsMap({gigs}) {
  
  const {activeMarker, setActiveMarker, handleActiveMarker } = useContext(TourContext)

  const concerts = gigs

  const markers = []

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY
  });

  if(concerts.length > 0){
    concerts.forEach(item => {
      markers.push({
        id: item.id,
        website: item._embedded.venues[0].url,
        name: item._embedded.venues[0].name,
        address: item._embedded.venues[0].address.line1,
        city: item._embedded.venues[0].city.name,
        state: item._embedded.venues[0].state.stateCode,
        position: {
          lat: parseFloat(item._embedded.venues[0].location.latitude),
          lng: parseFloat(item._embedded.venues[0].location.longitude)
        }
      });
    });
  }

  return (
      <div >
        {isLoaded ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GoogleMap
              center={{ lat: 38, lng: -99 }}
              zoom={4}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "40vh" }}
            >
              { markers.length > 0 && markers.map(({ id, website, name, position, address, city, state }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <a target="_blank" className="underline underline-offset-2 font-semibold" href={website}>
                          <p className="underline-offset-4">{name}</p>
                        </a>
                        <p>{address}</p>
                        <p>{city}, {state}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          </motion.div>
        ) : (
          null
        )
        }
      </div>
  );
}

export default EventsMap;
