import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { TourContext } from "../context/tour-context"
export default function EventItem({gig}) {

  const { activeMarker, setActiveMarker } = useContext(TourContext)
  
  const [showDetails, setShowDetails] = useState(false)

  const eventDetails = () => {
    setShowDetails(!showDetails)
  }

  const event = gig

  const dateString = event.dates.start.localDate
  const dateParts = dateString.split('-');

  // Extract year, month, and day from the array
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  const monthNumber = month
  const monthName = monthNames[monthNumber - 1]

  return (
    <div onClick={() => setActiveMarker(event.id)}
    className="mb-8 p-6 rounded-lg hover:bg-fuchsia-900 border-b-2 border-lime-300 border-solid">
      <div className="w-full md:flex md:justify-between sm:block">
        <div className="flex w-full">
          <div className="text-center w-1/4">
            <h5 className="text-6xl bebas-neue-regular">{day}</h5>
            <h5>{monthName}</h5>
            <h5>{year}</h5>
          </div>
          <div className="w-3/4">
            <h3 className="text-2xl bebas-neue-regular">{event.name}</h3>
            <h5>{event._embedded.venues[0].name}</h5>
            <h5>{event._embedded.venues[0].city.name}</h5>
          </div>
        </div>

        <div className=" flex">
          <button
          onClick={() => eventDetails()}
          type="button" className="md:self-end focus:outline-none bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900">Details</button>
        </div>

      </div>
      {showDetails &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

          <div className="mt-4 bg-lime-300 text-fuchsia-700 rounded-lg p-4">
            <div className="flex">
              <div className="w-1/2">
                <p>Genre: {event.classifications[0]?.genre?.name}</p>
              </div>
              <div className="w-1/2">
                <p>{event.dates?.start?.localTime}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <p>Event Starts: {event.dates?.start?.localTime}</p>
              </div>
              <div className="w-1/2">
                <p>Doors open: {event.doorsTimes?.localTime}</p>
              </div>
            </div>
            <div className="flex items-center pt-2">
              <div className="w-1/2">
                { event.priceRanges && <><p>tickets from {event.priceRanges[0].min}{event.priceRanges[0].currency}</p></> }
              </div>
              <div className="w-1/2">
                {/* {event.ticketLimit && <p>{event.ticketLimit.info}</p> } */}
              </div>
            </div>
            <div className="flex items-center pt-2">
              <div className="w-1/2">
                {event.url &&
                  <a target="_blank" href={event.url}>
                    <button type="button" className="focus:outline-none text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900">Purchase Tickets</button>
                  </a>
                }
              </div>
              <div className="w-1/2">
                {event.ticketLimit && <p>{event.ticketLimit.info}</p> }
              </div>
            </div>
          </div>
        </motion.div>
      }
    </div>
  )
}
