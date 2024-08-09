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


async function Videos() {
    // const res = await fetch('/api/videos');
    // const movies: Video[] = await res.json();
    const movies = [
        {
          id: "1",
          title: "Movie 1",
          publishYear: 2021,
          link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
          createdBy: "unknown"
        },
        {
            id: "2",
            title: "Movie 1",
            publishYear: 2021,
            link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
            createdBy: "unknown"
          },
          {
            id: "3",
            title: "Movie 1",
            publishYear: 2021,
            link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
            createdBy: "unknown"
          },
          {
            id: "4",
            title: "Movie 1",
            publishYear: 2021,
            link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
            createdBy: "unknown"
          },
          {
            id: "5",
            title: "Movie 1",
            publishYear: 2021,
            link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
            createdBy: "unknown"
          },
          {
            id: "6",
            title: "Movie 1",
            publishYear: 2021,
            link: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbtkvjzDDnUHyN~aQGzldRIPZ~Efwikc0CQ2165fmmCZ8cLb1Vna0loeGUBXfbIrtqWUCt2CX86TebT9ZSoIPvOc6qpGXIygA~ZQ9dDqAFnsqM2N8ZB4LpTSa5och5voawWo96~X0SxrLGwNKtYl6dIzjpliDYqGchtozoyh2jLOsQsYmtby~BAWgjQqYGXQ98Uc5JsVj~JFb7affwEbsHH694UkrFd2AEaN4g86v0tx8VriApTE26bGOXB7IvtIxr7xkIW7IeFsua1kikQpl12DmMC9wnNPovDlypQ2T8-JsXwLCkGr4DKbvUbTLKiVk1lYob1OXL6L~8NsL24foA__",
            createdBy: "unknown"
          }
    ]
    return (
        <>
            <Background />
            <div>
            {movies.length ? (
                <VideoList lists={movies} />
            ) : (
                <NoVideos />
            )}
            </div>
        </>
    );
}

export default Videos