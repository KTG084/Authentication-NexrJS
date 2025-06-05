"use client";

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/video";
import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";

export default function Home() {
  const [videos, setvideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setvideos(data);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    fetchVideos();
  }, []);
  return (
    <main className="container mx-auto px-4 py-8">
      
      <VideoFeed videos={videos} />
    </main>
  );
}
