"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { VideoForm, VideoFormData } from "./VideoForm";
import { VideoPreview } from "./VideoPreview";
import { generateVideoFromImage } from "@/lib/api/falai";
import { calculateVideoCredits } from "@/lib/utils";

export function VideoGenerator() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } =
    useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const handleGenerate = async (formData: VideoFormData) => {
    const requiredCredits = calculateVideoCredits(formData.duration);

    if (!hasEnoughCredits(requiredCredits)) {
      toast({
        title: "Insufficient Credits",
        description: "Please upgrade your plan to get more credits",
        variant: "destructive",
      });
      return;
    }

    if (!formData.image) {
      toast({
        title: "Error",
        description: "Please upload an image.",
        variant: "destructive",
      });
      return;
    }

    try {
      startLoading();
      setProgress(0);

      const imageUrl = URL.createObjectURL(formData.image);
      const url = await generateVideoFromImage(
        imageUrl,
        formData.prompt,
        formData.style,
        formData.duration,
        formData.resolution
      );

      setVideoUrl(url);
      deductCredits(requiredCredits);

      toast({
        title: "Success",
        description: "Video generated successfully",
      });
    } catch (err) {
      setLoadingError(
        err instanceof Error ? err.message : "Failed to generate video"
      );
      toast({
        title: "Error",
        description: "Failed to generate video. Please try again.",
        variant: "destructive",
      });
    } finally {
      stopLoading();
      setProgress(0);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <VideoForm onSubmit={handleGenerate} isLoading={isLoading} />
      </Card>

      <Card className="p-6">
        <VideoPreview
          videoUrl={videoUrl}
          isLoading={isLoading}
          error={error}
          progress={progress}
        />
      </Card>
    </div>
  );
}
