"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FileImage,
  Wand,
  Palette,
  User,
  ZapIcon,
  ImagePlus,
  ArrowUp,
} from "lucide-react";

// Commenting out old imports
// import { enhanceImage, upscaleImage } from "@/lib/api/falai";
import { ImageUploader } from "./ImageUploader";
import Image from "next/image";

// New AI feature types
type AIFeature = {
  id: string;
  label: string;
  description: string;
  credits: number;
  icon: React.ComponentType<{ className?: string }>;
};

const AI_FEATURES: AIFeature[] = [
  {
    id: "restoration",
    label: "AI Restoration",
    description: "Restore old, damaged, or low-quality photos",
    credits: 10,
    icon: Wand,
  },
  {
    id: "colorization",
    label: "Photo Colorization",
    description: "Add color to black and white photos",
    credits: 8,
    icon: Palette,
  },
  {
    id: "faceEnhancement",
    label: "Face Enhancement",
    description: "Enhance and beautify facial features",
    credits: 5,
    icon: User,
  },
  {
    id: "styleTransfer",
    label: "Style Transfer",
    description: "Apply artistic styles to your photos",
    credits: 7,
    icon: FileImage,
  },
  {
    id: "backgroundReplacement",
    label: "AI Background",
    description: "Replace or generate new backgrounds",
    credits: 6,
    icon: ImagePlus,
  },
  {
    id: "superResolution",
    label: "Super Resolution",
    description: "Upscale images without quality loss",
    credits: 8,
    icon: ArrowUp,
  },
];

export function ImageEnhancer() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string>("restoration");
  const [options, setOptions] = useState({
    preserveDetails: true,
    enhanceFaces: true,
    removeNoise: true,
    improveColors: true,
    styleStrength: 70,
  });

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } =
    useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const handleEnhance = async () => {
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    const feature = AI_FEATURES.find((f) => f.id === selectedFeature);
    if (!feature) return;

    if (!hasEnoughCredits(feature.credits)) {
      toast({
        title: "Insufficient Credits",
        description: "Please upgrade your plan to get more credits",
        variant: "destructive",
      });
      return;
    }

    try {
      startLoading();

      // TODO: Implement actual AI processing here based on selectedFeature
      // This is a placeholder for the actual API calls
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate processing result
      setEnhancedImage(imageUrl);
      deductCredits(feature.credits);

      toast({
        title: "Success",
        description: `Image processed with ${feature.label} successfully`,
      });
    } catch (err) {
      setLoadingError(
        err instanceof Error ? err.message : "Failed to process image"
      );
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
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
            onImageSelect={(url: string) => setImageUrl(url)}
            className="h-[400px]"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {AI_FEATURES.map((feature) => (
              <Card
                key={feature.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  selectedFeature === feature.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                )}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4" />
                    <h3 className="font-medium text-sm">{feature.label}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {feature.credits} Credits
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="preserveDetails">Preserve Original Details</Label>
              <Switch
                id="preserveDetails"
                checked={options.preserveDetails}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, preserveDetails: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enhanceFaces">Smart Face Enhancement</Label>
              <Switch
                id="enhanceFaces"
                checked={options.enhanceFaces}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, enhanceFaces: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="removeNoise">AI Noise Reduction</Label>
              <Switch
                id="removeNoise"
                checked={options.removeNoise}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, removeNoise: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="improveColors">Smart Color Enhancement</Label>
              <Switch
                id="improveColors"
                checked={options.improveColors}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, improveColors: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Enhancement Strength</Label>
              <Slider
                value={[options.styleStrength]}
                onValueChange={([value]) =>
                  setOptions((prev) => ({ ...prev, styleStrength: value }))
                }
                min={0}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground text-right">
                {options.styleStrength}%
              </p>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleEnhance}
            disabled={isLoading || !imageUrl}
          >
            {isLoading
              ? "Processing..."
              : `Process Image (${
                  AI_FEATURES.find((f) => f.id === selectedFeature)?.credits
                } Credits)`}
          </Button>

          {error && (
            <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {enhancedImage && (
        <div className="space-y-2">
          <Label>Processed Image</Label>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={enhancedImage}
              alt="Enhanced"
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => window.open(enhancedImage, "_blank")}
          >
            Download Processed Image
          </Button>
        </div>
      )}
    </div>
  );
}
