"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { calculateVideoCredits } from "@/lib/utils";

interface VideoFormProps {
  onSubmit: (data: VideoFormData) => void;
  isLoading: boolean;
}

export interface VideoFormData {
  prompt: string;
  style: string;
  resolution: string;
  duration: number;
  image: File | null;
}

export function VideoForm({ onSubmit, isLoading }: VideoFormProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    prompt: "",
    style: "",
    resolution: "",
    duration: 15,
    image: null,
  });
  const [requiredCredits, setRequiredCredits] = useState(0);

  useEffect(() => {
    setRequiredCredits(calculateVideoCredits(formData.duration));
  }, [formData.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDurationChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, duration: value[0] }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt">Video Description</Label>
        <Textarea
          id="prompt"
          placeholder="Describe what you want to generate..."
          value={formData.prompt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, prompt: e.target.value }))
          }
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Style</Label>
          <Select
            value={formData.style}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, style: value }))
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="animated">Animated</SelectItem>
              <SelectItem value="3d">3D Animation</SelectItem>
              <SelectItem value="motion">Motion Graphics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Resolution</Label>
          <Select
            value={formData.resolution}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, resolution: value }))
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="1080p">1080p (2x credits)</SelectItem>
              <SelectItem value="2k">2K (4x credits)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Duration: {formData.duration} seconds</Label>
          <span className="text-sm text-muted-foreground">
            {requiredCredits} credits required
          </span>
        </div>
        <Slider
          value={[formData.duration]}
          onValueChange={handleDurationChange}
          min={5}
          max={30}
          step={5}
          disabled={isLoading}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>5s</span>
          <span>30s</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? "Generating..."
          : `Generate Video (${requiredCredits} Credits)`}
      </Button>
    </form>
  );
}
