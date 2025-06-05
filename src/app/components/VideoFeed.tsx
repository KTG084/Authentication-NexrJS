import { IVideo } from "@/models/video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Reels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))}

        {videos.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-base-content/70">No videos Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
