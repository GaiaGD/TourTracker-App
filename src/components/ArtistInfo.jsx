import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Facebook from "./socials/Facebook"
import Instagram from "./socials/Instagram"
import Spotify from "./socials/Spotify"
import Twitter from "./socials/Twitter"
import Youtube from "./socials/Youtube"

export default function ArtistInfo({artistInfo}) {

    return (
        <motion.div key={artistInfo.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

            <div className="md:p-6 p-2 relative">
                <div className='md:absolute relative md:-top-[7rem] bg-black px-2 md:px-12 py-4 border-8 md:ml-6 border-lime-300 shadow-lg shadow-lime-300/50'>
                    {artistInfo.name &&
                        <div className="pb-6 pt-0">
                            <p className="md:my-4 text-xl Aktiv-Grotesk-Bold">Results For: </p>
                            <h1 className="text-[6rem] leading-[6rem] md:text-[8rem] Taboo-Pro-Medium-Italic text-lime-300">{artistInfo.name}</h1>
                        </div>
                    }
                    <div className='md:flex'>
                        {artistInfo.images ?
                            <div
                                className="md:h-64 h-32 w-64 rounded-lg bg-no-repeat bg-center bg-cover"
                                style={{
                                backgroundImage: `url(${artistInfo.images[5].url})`
                            }}>
                            </div>
                            :
                            <div
                                className="h-64 w-64 rounded-lg bg-no-repeat bg-center bg-cover bg-gray-50">
                            </div>
                        }

                        <div className="flex md:flex-col md:h-64 justify-between">
                            {artistInfo.externalLinks?.facebook &&
                                <div className="m-4 flex-grow">
                                    <a target="_blank" href={artistInfo.externalLinks.facebook[0].url}>
                                        <Facebook />
                                    </a>
                                </div>
                            }
                            {artistInfo.externalLinks?.youtube &&
                                <div className="m-4 flex-grow">
                                    <a target="_blank" href={artistInfo.externalLinks.youtube[0].url}>
                                        <Youtube />
                                    </a>
                                </div>
                            }
                            {artistInfo.externalLinks?.instagram &&
                                <div className="m-4 flex-grow">
                                    <a target="_blank" href={artistInfo.externalLinks.instagram[0].url}>
                                        <Instagram />
                                    </a>
                                </div>
                            }
                            {artistInfo.externalLinks?.spotify &&
                                <div className="m-4 flex-grow">
                                    <a target="_blank" href={artistInfo.externalLinks.spotify[0].url}>
                                        <Spotify />
                                    </a>
                                </div>
                            }
                            {artistInfo.externalLinks?.twitter &&
                                <div className="m-4 flex-grow">
                                    <a target="_blank" href={artistInfo.externalLinks.twitter[0].url}>
                                        <Twitter />
                                    </a>
                                </div>
                            }
                        </div>
                    </div>


                    <div className='my-4'>
                        { artistInfo.classifications &&
                            <p className='Aktiv-Grotesk-Bold text-xl'>Genre: {artistInfo.classifications[0].genre.name}</p>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )

}