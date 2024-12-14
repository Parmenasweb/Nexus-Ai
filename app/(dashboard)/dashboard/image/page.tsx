"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/tools/image/ImageUploader";
import { ImageOptions } from "@/components/tools/image/ImageOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AIError } from "@/lib/api-config";
import { toast } from "sonner";
import Image from "next/image";

export default function ImageToolsPage() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [processedImage, setProcessedImage] = useState<string>();
  const [activeTab, setActiveTab] = useState<
    "enhance" | "background" | "generate" | "convert"
  >("enhance");

  const handleImageSelect = async (imageUrl: string) => {
    try {
      // If the image is a data URL, we need to convert it to a Blob URL
      if (imageUrl.startsWith("data:")) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        imageUrl = URL.createObjectURL(blob);
      }

      setSelectedImage(imageUrl);
      setProcessedImage(undefined);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    }
  };

  const handleProcessingComplete = (result: string) => {
    setProcessedImage(result);
  };

  const handleError = (error: AIError) => {
    toast.error(error.message);
    setProcessedImage(undefined);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as typeof activeTab);
    setProcessedImage(undefined);
    setSelectedImage(undefined);
  };

  return (
    <div className="container max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Image Tools</h1>
        <p className="text-muted-foreground">
          Transform and enhance your images with AI
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="enhance">Enhancement</TabsTrigger>
          <TabsTrigger value="background">Background Removal</TabsTrigger>
          <TabsTrigger value="generate">Generation</TabsTrigger>
          <TabsTrigger value="convert">Conversion</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {activeTab === "generate" ? (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Image Generation</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate unique images from text descriptions using advanced
                  AI
                </p>
                <ImageOptions
                  type="generate"
                  onProcessingComplete={handleProcessingComplete}
                  onError={handleError}
                />
              </Card>
            ) : (
              <>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload the image you want to process
                  </p>
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    onError={handleError}
                    accept={["image/jpeg", "image/png", "image/webp"]}
                  />
                </Card>

                {selectedImage && (
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Original Image
                    </h2>
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={selectedImage}
                        alt="Original"
                        fill
                        className="object-contain"
                        unoptimized // Required for Blob URLs
                      />
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Options</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Configure processing options
              </p>
              <ImageOptions
                type={activeTab}
                selectedImage={selectedImage}
                onProcessingComplete={handleProcessingComplete}
                onError={handleError}
              />
            </Card>

            {processedImage && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Processed Image</h2>
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={processedImage}
                    alt="Processed"
                    fill
                    className="object-contain"
                    unoptimized // Required for external URLs
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
