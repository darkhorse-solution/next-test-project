'use client'
import Background from "@/components/ui/background";
import { useState } from "react";
import NoVideos from "@/components/video/novideo";
import VideoList from "@/components/video/videolist";

type Video = {
    id: string; // or number, depending on your needs
    title: string;
    publishYear: number; // Corrected property name
    link: string;
    createdBy: string;
};


export default function Videos() {
    const [movies, setMovies] = useState<Video[]>([
        {
            id: "rwef23fwf",
            title: "OK",
            publishYear: 2019,
            link: "https://sfs.com/sdf",
            createdBy: "natash"
        }
    ])
    return (
        <>
             <Background />
            {movies.length ? (
                <VideoList lists={movies} /> 
            ) : (
                <NoVideos />
            )}
        </>
    )
}