"use client";
// import Background from "@/components/ui/background";
import { useEffect, useState } from "react";
import NoVideos from "@/components/video/novideo";
import VideoList from "@/components/video/videolist";
import Pagination from "@/components/video/pagination";
import Loading from "@/components/Loading";

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
  pageSize: number,
  changeCurpage: Function,
};

function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [curpage, setCurpage] = useState<number>(1);
  const [pageState, setPageState] = useState<PageState | undefined>(undefined)
  const [loading, setLoading] = useState(true);
  function changeCurpage (page: number) {
    setCurpage(page);
  }
  
  useEffect(() => {
    const fetchVideos = async () => {            
      try {
        const response = await fetch(`/api/videos?page=${curpage}&limit=10`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setVideos(res.videos);        
        setPageState(prevState=> ({
          ...prevState,
          ...res.pagination, 
          changeCurpage: changeCurpage
        }))        
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("couldn't get successfully");
      }
    };
    fetchVideos();
   
  }, [curpage]);  
  if (loading) {
    return <Loading />;
  }

  return (
    <>
    
      <div>
        {videos.length ? (
          <div>
            <VideoList lists={videos} />
            <div className="flex mt-10" style={{ justifyContent: "center" }}>
              <Pagination pageState = {pageState} />
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
