"use client";
// import Background from "@/components/ui/background";
import { useEffect, useState } from "react";
import NoVideos from "@/components/video/novideo";
import VideoList from "@/components/video/videolist";
import Pagenation from "@/components/video/pagenation";

type Video = {
  _id: string; // or number, depending on your needs
  title: string;
  publishYear: number; // Corrected property name
  link: string;
  createdBy: string;
};

type PageState = {
  totalDocuments: number,
  totalPages: number,
  currentPage: number,
  pageSize: number
};

function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pageState, setPageState] = useState<PageState | undefined>(undefined)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos?page=1&limit=10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setVideos(res.videos);
        setPageState(res.pagination)        
      } catch (error) {
        console.log("couldn't get successfully");
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
    
      <div>
        {videos.length ? (
          <div>
            <VideoList lists={videos} />
            <div className="flex mt-10" style={{ justifyContent: "center" }}>
              <Pagenation pageState = {pageState} />
            </div>
            
          </div>
        ) : (
          <NoVideos />
        )}
      </div>
    </>
  );
}

export default Videos;
