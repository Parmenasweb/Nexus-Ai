import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentFormProps {
  type: "social" | "article" | "marketing" | "seo";
  onSubmit: (data: ContentFormData) => void;
  isLoading: boolean;
}

export interface ContentFormData {
  platform?: string;
  topic: string;
  tone: string;
  keywords: string;
  callToAction: string;
  targetAudience: string;
  contentLength?: string;
  mediaType?: string;
  hashtags?: string;
}

export function ContentForm({ type, onSubmit, isLoading }: ContentFormProps) {
  const [formData, setFormData] = useState<ContentFormData>({
    topic: "",
    tone: "",
    keywords: "",
    callToAction: "",
    targetAudience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ContentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === "social" && (
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select
            value={formData.platform}
            onValueChange={(value) => handleChange("platform", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Topic or Product</Label>
        <Textarea
          placeholder="What are you writing about?"
          value={formData.topic}
          onChange={(e) => handleChange("topic", e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Target Audience</Label>
        <Input
          placeholder="Who is this content for?"
          value={formData.targetAudience}
          onChange={(e) => handleChange("targetAudience", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select
            value={formData.tone}
            onValueChange={(value) => handleChange("tone", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === "article" && (
          <div className="space-y-2">
            <Label>Content Length</Label>
            <Select
              value={formData.contentLength}
              onValueChange={(value) => handleChange("contentLength", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (300 words)</SelectItem>
                <SelectItem value="medium">Medium (600 words)</SelectItem>
                <SelectItem value="long">Long (1000+ words)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Keywords</Label>
        <Input
          placeholder="Enter important keywords (comma-separated)"
          value={formData.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Call to Action</Label>
        <Input
          placeholder="What action should readers take?"
          value={formData.callToAction}
          onChange={(e) => handleChange("callToAction", e.target.value)}
        />
      </div>

      {type === "social" && (
        <>
          <div className="space-y-2">
            <Label>Hashtags</Label>
            <Input
              placeholder="Enter hashtags (comma-separated)"
              value={formData.hashtags}
              onChange={(e) => handleChange("hashtags", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Media Type</Label>
            <Select
              value={formData.mediaType}
              onValueChange={(value) => handleChange("mediaType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
                <SelectItem value="text">Text Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Content"}
      </Button>
    </form>
  );
}