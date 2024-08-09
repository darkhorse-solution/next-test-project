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
        <div className="video-image">
          <Image
            src={content.link}
            alt={content.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-white ml-3 mt-3">
          <h4 className="text-2xl">{content.title}</h4>
          <h6 className="text-xl">{content.publishYear}</h6>
        </div>
      </div>
    </>
  );
}
