import Image from "next/image";
import {useRouter} from "next/navigation";

type Video = {
  _id: string;
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
};
interface VideoCard {
  content: Video;
}

export default function VideoCard({ content }: VideoCard) {
    const router = useRouter();
    function handleEdit() {
        let link = "/video/edit/" + content._id;
        router.push(link);
    }
  return (
    <>
      <div className="video-card" onClick={handleEdit}>
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
