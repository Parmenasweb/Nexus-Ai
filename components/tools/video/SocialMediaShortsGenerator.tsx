"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generateSocialMediaShorts } from "@/lib/api/falai"; // Import the new API function

export function SocialMediaShortsGenerator() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handleGenerateShort = async () => {
    if (!videoFile || !caption) {
      toast({
        title: "Error",
        description: "Please upload a video and enter a caption.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setShortUrl(null); // Reset short URL

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("caption", caption);

      const url = await generateSocialMediaShorts(videoFile, caption); // Call the new API function

      setShortUrl(url);
      toast({
        title: "Success",
        description: "Short video generated successfully!",
      });
    } catch (error) {
      console.error("Error generating short video:", error);
      toast({
        title: "Error",
        description: "Failed to generate short video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Generate Social Media Shorts</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <Input
        placeholder="Enter caption for the video"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button onClick={handleGenerateShort} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Generate Short"}
      </Button>

      {shortUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated Short Video</h3>
          <video controls src={shortUrl} className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}
