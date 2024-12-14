"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { removeBackground } from "@/lib/api/falai";
import { ImageUploader } from "./ImageUploader";

export function BackgroundRemover() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } = useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const handleRemoveBackground = async () => {
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    if (!hasEnoughCredits(5)) {
      toast({
        title: "Insufficient Credits",
        description: "Please upgrade your plan to get more credits",
        variant: "destructive",
      });
      return;
    }

    try {
      startLoading();
      const resultUrl = await removeBackground(imageUrl);
      setProcessedImage(resultUrl);
      deductCredits(5);

      toast({
        title: "Success",
        description: "Background removed successfully",
      });
    } catch (err) {
      setLoadingError(err instanceof Error ? err.message : "Failed to remove background");
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <ImageUploader
            onImageSelected={(url) => setImageUrl(url)}
            className="h-[400px]"
          />
        </div>

        <div className="space-y-6">
          <Button
            className="w-full"
            onClick={handleRemoveBackground}
            disabled={isLoading || !imageUrl}
          >
            {isLoading ? "Processing..." : "Remove Background (5 Credits)"}
          </Button>

          {error && (
            <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {processedImage && (
        <div className="space-y-2">
          <Label>Processed Image</Label>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-[url('/checkerboard.png')]">
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => window.open(processedImage, '_blank')}
          >
            Download Processed Image
          </Button>
        </div>
      )}
    </div>
  );
}