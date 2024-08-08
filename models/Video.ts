import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  publishYear: number;
  link: string;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: { type: String, required: true },
    publishYear: { type: Number, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
export default Video;
