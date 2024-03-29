import React, { useState, useEffect } from "react";

const TourContext = React.createContext()

function TourContextProvider(props){
    
    const[visited, setVisited] = useState(false)
    const [activeMarker, setActiveMarker] = useState(null);

    const [isDarkTheme, setIsDarkTheme] = useState(true)

    const toggleTheme = () => {
      const body = document.body;
      body.classList.toggle('dark');
      console.log(body)
      setIsDarkTheme(prevTheme => !prevTheme);
    };

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
          handleActiveMarker,
          isDarkTheme,
          toggleTheme
          }}>
            {props.children}
        </TourContext.Provider>
    )
}

export {TourContextProvider, TourContext }