import Image from "next/image";

type Video = {
  id: string;
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
};
interface VideoCard {
  content: Video;
}

export default function VideoCard({ content }: VideoCard) {
  return (
    <>
      <div className="video-card">
        <Image src="https://dummyimage.com/720x400" alt="okok" layout="fill" />
        <div className="text-white">
          <h4>{content.title}</h4>
          <h6>{content.publishYear}</h6>
        </div>
      </div>
    </>
  );
}
