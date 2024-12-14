"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ImageIcon,
  UploadIcon,
  XIcon,
  CropIcon,
  ZoomInIcon,
  RotateCwIcon,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AIError } from "@/lib/api-config";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  onError?: (error: AIError) => void;
  maxSize?: number;
  multiple?: boolean;
  accept?: string[];
  className?: string;
  aspectRatio?: number;
  showCropper?: boolean;
}

export function ImageUploader({
  onImageSelect,
  onError,
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  accept = ["image/jpeg", "image/png", "image/webp"],
  className,
  aspectRatio,
  showCropper = false,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crop, setCrop] = useState<Crop>();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentImage, setCurrentImage] = useState<string>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        setProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 100);

        // Process each file
        const newFiles = acceptedFiles.filter(
          (file) =>
            !files.some((existingFile) => existingFile.name === file.name)
        );

        // Convert files to data URLs
        const processedFiles = await Promise.all(
          newFiles.map((file) => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );

        // Update state and notify parent
        setFiles((prev) => [...prev, ...newFiles]);
        processedFiles.forEach((url) => {
          setCurrentImage(url);
          if (!showCropper) {
            onImageSelect(url);
          }
        });

        // Complete progress
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setUploading(false);
        }, 500);
      } catch (error) {
        console.error("Error processing files:", error);
        onError?.(error as AIError);
        setUploading(false);
        setProgress(0);
      }
    },
    [files, onImageSelect, onError, showCropper]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (files.length === 1) {
      setCurrentImage(undefined);
    }
  };

  const handleCropComplete = useCallback(() => {
    if (!currentImage || !crop) return;

    const image = new window.Image();
    image.src = currentImage;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate cropped image dimensions
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * scaleX * pixelRatio;
    canvas.height = crop.height * scaleY * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    // Apply rotation if needed
    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    // Draw and scale the image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Convert to base64 and notify parent
    const base64Image = canvas.toDataURL("image/jpeg", 0.9);
    onImageSelect(base64Image);
  }, [currentImage, crop, rotation, onImageSelect]);

  return (
    <div className={className}>
      <Card
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center p-6 text-center cursor-pointer border-dashed transition-colors",
          isDragActive && "border-primary bg-accent",
          uploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-accent p-3">
            <UploadIcon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">
              {isDragActive ? "Drop files here" : "Upload files"}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, WebP
            </p>
            <p className="text-xs text-muted-foreground">
              Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>
        </div>
      </Card>

      {uploading && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {currentImage && showCropper && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zoom</label>
            <Slider
              value={[zoom]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={([value]) => setZoom(value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Rotation</label>
            <Slider
              value={[rotation]}
              min={0}
              max={360}
              step={90}
              onValueChange={([value]) => setRotation(value)}
            />
          </div>
          <ReactCrop
            crop={crop}
            onChange={(c: Crop) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={aspectRatio}
          >
            <Image
              src={currentImage}
              alt="Upload preview"
              width={500}
              height={500}
              className="max-w-full h-auto"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          </ReactCrop>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 border rounded-lg"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex gap-2">
                {showCropper && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentImage(URL.createObjectURL(file))}
                  >
                    <CropIcon className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
