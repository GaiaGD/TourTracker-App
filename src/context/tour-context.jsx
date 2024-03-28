import React, { useState, useEffect } from "react";

const TourContext = React.createContext()

function TourContextProvider(props){

    // const userTheme = localStorage.getTheme('theme')
    // const systemTheme = window.matchMedia("prefers-color-scheme: dark").matches

    // // check what theme the user has
    // const themeCheck = () => {
    //   if(useTheme === "dark" || (!userTheme && systemTheme)){
    //     document.documentElement.classList.add("dark")
    //     // hide button for dark 
    //     return
    //   }
    //   // hide button for sun
    // }

    // const themeSwitch = () => {
    //   if (document.documentElement.classList.contains("dark")){
    //     document.documentElement.classList.remove("dark")
    //     localStorage.setItem("theme", "light")
    //     iconToggle();
    //     return
    //   }
    //   document.documentElement.classList.add("dark")
    //   localStorage.setItem("theme", "dark")
    //   iconToggle()
    // }

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