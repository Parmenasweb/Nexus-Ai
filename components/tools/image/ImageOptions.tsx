"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  enhanceImage,
  generateImage,
  removeBackground,
  upscaleImage,
  convertImage,
} from "@/lib/api/falai";
import { AIError } from "@/lib/api-config";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ImageOptionsProps {
  type: "enhance" | "background" | "generate" | "convert";
  selectedImage?: string;
  onProcessingComplete?: (result: string) => void;
  onError?: (error: AIError) => void;
  onFeatureChange?: () => void;
}

const IMAGE_STYLES = [
  "photorealistic",
  "artistic",
  "cartoon",
  "anime",
  "digital art",
  "oil painting",
  "watercolor",
  "sketch",
  "3D render",
  "minimalist",
  "cyberpunk",
  "steampunk",
  "pop art",
  "abstract",
  "vintage",
  "noir",
  "fantasy",
  "sci-fi",
  "cinematic",
  "hyper-realistic",
  "concept art",
  "studio ghibli",
  "low poly",
  "pixel art",
  "vaporwave",
  "renaissance",
  "impressionist",
  "surrealist",
] as const;

const IMAGE_SIZES = [
  { label: "Small (512x512)", value: "512x512" },
  { label: "Medium (760x760)", value: "760x760" },
  { label: "Large (1024x1024)", value: "1024x1024" },
  { label: "Extra Large (2048x2048)", value: "2048x2048" },
] as const;

const IMAGE_FORMATS = [
  { label: "JPEG", value: "jpeg" },
  { label: "PNG", value: "png" },
  { label: "WEBP", value: "webp" },
  { label: "PDF", value: "pdf" },
  { label: "GIF", value: "gif" },
] as const;

const AI_FEATURES = {
  restoration: {
    label: "Image Restoration",
    description: "Restore old, damaged, or low-quality photos",
    credits: 10,
  },
  upscale: {
    label: "Super Resolution",
    description: "Upscale images without quality loss",
    credits: 8,
  },
  enhance: {
    label: "AI Enhancement",
    description: "Enhance overall image quality",
    credits: 5,
  },
  denoise: {
    label: "Noise Reduction",
    description: "Remove noise and artifacts",
    credits: 7,
  },
};

export function ImageOptions({
  type,
  selectedImage,
  onProcessingComplete,
  onError,
  onFeatureChange,
}: ImageOptionsProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(IMAGE_STYLES[0]);
  const [size, setSize] = useState<(typeof IMAGE_SIZES)[number]["value"]>(
    IMAGE_SIZES[1].value
  );
  const [selectedFeature, setSelectedFeature] =
    useState<keyof typeof AI_FEATURES>("enhance");
  const [targetFormat, setTargetFormat] =
    useState<(typeof IMAGE_FORMATS)[number]["value"]>("jpeg");
  const [options, setOptions] = useState({
    upscale: false,
    denoise: false,
    enhance: true,
    preserveDetails: true,
    scale: 2,
    seed: Math.floor(Math.random() * 1000000),
  });

  const handleProcess = async () => {
    if (
      (type === "background" || type === "enhance" || type === "convert") &&
      !selectedImage
    ) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      let result: string;

      switch (type) {
        case "enhance":
          if (!selectedImage) throw new Error("No image selected");
          setProgress(20);

          if (selectedFeature === "upscale") {
            result = await upscaleImage(selectedImage, options.scale);
          } else {
            result = await enhanceImage(selectedImage, {
              upscale: false,
              denoise: selectedFeature === "denoise",
              enhance:
                selectedFeature === "enhance" ||
                selectedFeature === "restoration",
            });
          }
          break;

        case "background":
          if (!selectedImage) throw new Error("No image selected");
          result = await removeBackground(selectedImage);
          break;

        case "generate":
          result = await generateImage(
            {
              prompt,
              style,
              size,
            },
            (progress) => setProgress(progress)
          );
          break;

        case "convert":
          if (!selectedImage) throw new Error("No image selected");
          setProgress(20);
          result = await convertImage(selectedImage, targetFormat);
          break;

        default:
          throw new Error("Invalid operation type");
      }

      setProgress(100);
      onProcessingComplete?.(result);
      toast.success("Processing complete!");
    } catch (error) {
      console.error("Processing error:", error);
      onError?.(error as AIError);
      toast.error((error as AIError).message || "Processing failed");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const handleFeatureChange = (key: keyof typeof AI_FEATURES) => {
    setSelectedFeature(key);
    onFeatureChange?.();
  };

  return (
    <Card className="p-6 space-y-6">
      {type === "generate" && (
        <Accordion type="single" collapsible defaultValue="prompt">
          <AccordionItem value="prompt">
            <AccordionTrigger>Prompt Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Image Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to see in the image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-32"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="style">
            <AccordionTrigger>Style Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="style">Art Style</Label>
                <Select
                  value={style}
                  onValueChange={(value: string) =>
                    setStyle(value as typeof style)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_STYLES.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger>Size Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size">Output Size</Label>
                <Select
                  value={size}
                  onValueChange={(value: typeof size) => setSize(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seed">Seed (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="seed"
                    type="number"
                    value={options.seed}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        seed: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      setOptions((prev) => ({
                        ...prev,
                        seed: Math.floor(Math.random() * 1000000),
                      }))
                    }
                  >
                    Random
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {type === "enhance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(AI_FEATURES).map(([key, feature]) => (
              <Card
                key={key}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  selectedFeature === key
                    ? "border-primary"
                    : "hover:border-primary/50"
                )}
                onClick={() =>
                  handleFeatureChange(key as keyof typeof AI_FEATURES)
                }
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{feature.label}</h3>
                    <Badge variant="secondary">{feature.credits} Credits</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {selectedFeature === "upscale" && (
            <div className="space-y-2">
              <Label>Upscale Factor</Label>
              <Slider
                value={[options.scale]}
                onValueChange={([value]) =>
                  setOptions((prev) => ({ ...prev, scale: value }))
                }
                min={1}
                max={4}
                step={0.5}
              />
              <p className="text-sm text-muted-foreground text-right">
                {options.scale}x
              </p>
            </div>
          )}
        </div>
      )}

      {type === "background" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Remove the background from your image using advanced AI. The
            processed image will have a transparent background.
          </p>
          {!selectedImage && (
            <p className="text-sm text-destructive">
              Please upload an image first
            </p>
          )}
        </div>
      )}

      {type === "convert" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="format">Target Format</Label>
            <Select
              value={targetFormat}
              onValueChange={(value: typeof targetFormat) =>
                setTargetFormat(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Convert your image to a different format. The quality will be
              preserved as much as possible during the conversion.
            </p>
            {!selectedImage && (
              <p className="text-sm text-destructive">
                Please upload an image first
              </p>
            )}
          </div>
        </div>
      )}

      {loading && progress > 0 && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            Processing... {progress}%
          </p>
        </div>
      )}

      <Button
        className="w-full"
        disabled={
          loading ||
          (type === "generate" && !prompt) ||
          ((type === "background" || type === "enhance") && !selectedImage)
        }
        onClick={handleProcess}
      >
        {loading ? "Processing..." : "Process Image"}
      </Button>
    </Card>
  );
}
