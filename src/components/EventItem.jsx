import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { TourContext } from "../context/tour-context"
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function EventItem({gig}) {

  const { activeMarker, setActiveMarker } = useContext(TourContext)
  
  const [showDetails, setShowDetails] = useState(false)

  const eventDetails = () => {
    setShowDetails(!showDetails)
  }

  const event = gig
  console.log(gig)
  
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

  function convertTo12HourFormat(time24) {
    let [hours, minutes] = time24.split(':').map(Number)
    let period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    minutes = (minutes < 10 ? '0' : '') + minutes
    return `${hours}:${minutes} ${period}`
  }

  return (
    <div onClick={() => setActiveMarker(event.id)}
    className="mb-6 md:mb-8 p-2 md:p-3 md:p-6 hover:bg-indigo-950 border-8 border-lime-300 border-solid shadow-lg shadow-lime-300/50">
      <div className="w-full md:flex md:justify-between sm:block">
        <div className="flex w-full items-center">
          <div className="text-center w-1/4">
            <h5 className="text-[4rem] text-violet-300 leading-[4rem] Taboo-Pro-Medium">{day}</h5>
            <h5>{monthName}</h5>
            <h5>{year}</h5>
          </div>
          <div className="w-3/4">
            <h3 className="md:text-2xl text-xl Aktiv-Grotesk-Bold text-violet-300">{event.name}</h3>
            <h5>{event._embedded.venues[0].name}</h5>
            <h5>{event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}</h5>
          </div>
        </div>

        <div className="flex justify-end">
          <button
          onClick={() => eventDetails()}
          type="button" className="
          rounded-full
          md:w-auto
          self-end
          focus:outline-none
          bg-violet-300
          hover:bg-violet-200
          font-medium
          text-base
          p-4
          mb-2
          text-black"
          >
            {showDetails ? <SlArrowUp/> : <SlArrowDown />}
          </button>
        </div>

      </div>
      {showDetails &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

          <div className="mt-4 text-line-300 py-4 border-t-2 border-solid border-lime-300">
            <div className="md:flex">
              <div className="md:w-1/2 w-full">
                {event.classifications[0]?.genre && <p>Genre: {event.classifications[0]?.genre?.name}</p>}
              </div>
              <div className="md:w-1/2 w-full">
                {event.dates?.status?.code && <p>Status: {event.dates?.status.code}</p>}
              </div>
            </div>
            <div className="md:flex">
              <div className="md:w-1/2 w-full">
                {event.dates?.start?.localTime && <p>{convertTo12HourFormat(event.dates?.start?.localTime)}</p>}
              </div>
              <div className="md:w-1/2 w-full">
                {event.doorsTimes?.localTime && <p>Doors open: {event.doorsTimes?.localTime}</p>}
              </div>
            </div>
            <div className="md:flex items-center pt-2">
              <div className="md:w-1/2 w-full">
                {event.priceRanges && <p>tickets from {event.priceRanges[0].min}{event.priceRanges[0].currency}</p> }
              </div>
              <div className="md:w-1/2 w-full">
                {/* {event.ticketLimit && <p>{event.ticketLimit.info}</p> } */}
              </div>
            </div>
            <div className="md:flex md:items-center pt-2">
              <div className="md:w-1/2 w-full">
                {event.ticketLimit?.info && <p>{event.ticketLimit.info}</p> }
              </div>
              <div className="md:w-1/2 w-full text-end pt-4">
                {event.url &&
                  <a target="_blank" href={event.url}>
                    <button type="button" className="
                    rounded-full
                    w-full
                    md:w-auto
                    focus:outline-none
                    text-white
                    bg-violet-300
                    hover:bg-violet-200
                    focus:ring-4
                    focus:ring-fuchsia-300
                    font-medium
                    text-base
                    px-5
                    py-2.5
                    mb-2
                    text-black"
                    >Purchase Tickets</button>
                  </a>
                }
              </div>
            </div>
            <div className="flex">
              <div className="mt-4 md:w-1/2 md:mr-4 w-full">
                  {event.accessibility?.info && <small>{event.accessibility.info}</small>}
                </div>
                <div className="mt-4 md:w-1/2 w-full">
                  {event.pleaseNote && <small>*{event.pleaseNote}</small>}
                </div>
            </div>
          </div>
        </motion.div>
      }
    </div>
  )
}
