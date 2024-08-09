"use client";

import VideoCard from "./videocard";

type Video = {
  id: string;
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
};
interface VideoListProps {
  lists: Video[];
}

export default function VideoList({ lists }: VideoListProps) {
  console.log(lists);
  return (
    <>
      <div className="video-container">
        <h1 className="text-4xl text-white mb-10">My Movies</h1>
        <div className="flex flex-wrap -m-4">
          {lists.map((list, idx) => {
            return (
              <div key={idx} className="md:w-1/4 sm: w-1/2 p-2">
                <VideoCard content={list} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
