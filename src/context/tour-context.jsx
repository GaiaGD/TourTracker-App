import React, { useState, useEffect } from "react";

const TourContext = React.createContext()

function TourContextProvider(props){

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        console.log('info')
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

    return (
        <TourContext.Provider
          value={{ activeMarker,
          setActiveMarker,
          handleActiveMarker
          }}>
            {props.children}
        </TourContext.Provider>
    )
}

export {TourContextProvider, TourContext }