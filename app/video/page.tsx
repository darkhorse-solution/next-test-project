'use client'
import Background from "@/components/ui/background";
import { useState } from "react";
import NoVideos from "@/components/novideo";
import VideoList from "@/components/videolist";

export default function Videos() {
    const [movies, setMovies] = useState([])

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