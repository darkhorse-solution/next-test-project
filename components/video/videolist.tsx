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
    <div className="container">
      <div className="flex flex-wrap -m-4">
        {lists.map((list, idx) => {
          return (
            
              <div  key={idx} style={{width: '30%'}}>
                <VideoCard content={list} />
              </div>            
          );
        })}
      </div>
      </div>
    </>
  );
}
