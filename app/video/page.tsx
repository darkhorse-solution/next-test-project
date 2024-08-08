'use client'
import Background from "@/components/ui/background";
import { useState } from "react";
import NoVideos from "@/components/novideo";
import VideoList from "@/components/videolist";

export default function Videos() {
<<<<<<< HEAD
    const [movies, setMovies] = useState([])
=======
    const [movies, setMovies] = useState([
        {
            title: "OK"
        }
    ])
>>>>>>> 160815685f966c63f97ae216ccd5743ced193dc6

    return (
        <>
            <Background/>
            {
                movies?.length? (
                    <VideoList movies={movies} />
                ):
                (
                    <NoVideos/>
                )
            }
        </>
    )
}