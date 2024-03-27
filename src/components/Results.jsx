import { useState, useEffect } from "react"
import EventItem from "./EventItem"
import ReactPaginate from "react-paginate"
import { motion } from "framer-motion"

export default function Results ({gigs}) {

    let displayEvents = []

    const [currentPage, setCurrentPage] = useState(0)

    const events = gigs

    const test = events[0]?.name

    const eventsPerPage = 20
    const pagesVisited = currentPage * eventsPerPage
    
    if(events.length > 0 ){
        displayEvents = events
            .slice(pagesVisited,  pagesVisited + eventsPerPage)
            .map((gig, i) => (
            <EventItem key={i} gig={gig} />
        ))
    }

    const totalPages = Math.ceil(events.length / eventsPerPage)

    const changePage = ({selected}) => {
        setCurrentPage(selected)
    }

    return (
        <div className="mt-6">
            {displayEvents.length > 0 ? (
                <motion.div key={test} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <div className="pb-6">
                        <h1 className="text-center text-3xl Aktiv-Grotesk-Bold">Upcoming Shows: </h1>
                    </div>
                    <div>
                        <div className="">
                            {displayEvents}
                        </div>
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={totalPages}
                            onPageChange={changePage}
                            containerClassName={"paginationButtons flex p-4 justify-center"}
                            disabledClassName = {"disabled opacity-25"}
                            activeClassName = {"active bg-fuchsia-900 text-lime-300"}
                        />
                    </div>
                </motion.div>
            ) : (
                <motion.div key={test} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <div>
                        <div className="pb-6">
                            <h1 className="text-center text-3xl Aktiv-Grotesk-Bold">No upcoming shows.</h1>
                        </div>
                    </div>
                </motion.div>
            )}

        </div>
    )
}