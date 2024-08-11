import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: { type: String, required: true },
    publishYear: { type: Number},
    link: { type: String, required: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
export default Video;
