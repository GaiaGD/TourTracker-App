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

            <div className="p-6 animate-fade">
                {artistInfo.name &&
                    <div className="py-6">
                        <p className="my-4">Results For: </p>
                        <h1 className="text-7xl bebas-neue-regular drop-shadow-lg text-lime-300">{artistInfo.name}</h1>
                    </div>
                }

                {artistInfo.images ?
                    <div
                        className="h-64 w-64 rounded-lg bg-no-repeat bg-center bg-cover"
                        style={{
                        backgroundImage: `url(${artistInfo.images[5].url})`
                    }}>
                    </div>
                    :
                    <div
                        className="h-64 w-64 rounded-lg bg-no-repeat bg-center bg-cover bg-gray-50">
                    </div>
                }
                

                <div className="flex">
                    {artistInfo.externalLinks?.facebook &&
                        <div className="m-4">
                            <a target="_blank" href={artistInfo.externalLinks.facebook[0].url}>
                                <Facebook />
                            </a>
                        </div>
                    }
                    {artistInfo.externalLinks?.youtube &&
                        <div className="m-4">
                            <a target="_blank" href={artistInfo.externalLinks.youtube[0].url}>
                                <Youtube />
                            </a>
                        </div>
                    }
                    {artistInfo.externalLinks?.instagram &&
                        <div className="m-4">
                            <a target="_blank" href={artistInfo.externalLinks.instagram[0].url}>
                                <Instagram />
                            </a>
                        </div>
                    }
                    {artistInfo.externalLinks?.spotify &&
                        <div className="m-4">
                            <a target="_blank" href={artistInfo.externalLinks.spotify[0].url}>
                                <Spotify />
                            </a>
                        </div>
                    }
                    {artistInfo.externalLinks?.twitter &&
                        <div className="m-4">
                            <a target="_blank" href={artistInfo.externalLinks.twitter[0].url}>
                                <Twitter />
                            </a>
                        </div>
                    }
                </div>

                <div className='my-4'>
                    { artistInfo.classifications &&
                        <p>Genre: {artistInfo.classifications[0].genre.name}</p>
                    }
                </div>

            </div>
        </motion.div>
    )

}