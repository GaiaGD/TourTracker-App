import React, { useState, useEffect } from "react";

const TourContext = React.createContext()

function TourContextProvider(props){
    
    const[visited, setVisited] = useState(false)
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

    return (
        <TourContext.Provider
          value={{
          visited,
          setVisited,
          activeMarker,
          setActiveMarker,
          handleActiveMarker
          }}>
            {props.children}
        </TourContext.Provider>
    )
}

export {TourContextProvider, TourContext }