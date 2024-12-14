"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { generateImage } from "@/lib/api/falai";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles, Download, RefreshCcw } from "lucide-react";
import { PromptSuggestions } from "./PromptSuggestions";
import { StyleSelector } from "./StyleSelector";
import { ImagePreview } from "./ImagePreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } = useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();
  const isPaidUser = true; // This should come from your auth/subscription system

  const handleGenerate = async () => {
    if (!prompt || !style || !size) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!hasEnoughCredits(10)) {
      toast({
        title: "Insufficient Credits",
        description: "Please upgrade your plan to get more credits",
        variant: "destructive",
      });
      return;
    }

    try {
      startLoading();
      const imageUrl = await generateImage(prompt, style, size);
      setGeneratedImage(imageUrl);
      deductCredits(10);
      
      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (err) {
      setLoadingError(err instanceof Error ? err.message : "Failed to generate image");
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="prompt">Image Description</Label>
            <Badge variant="secondary" className="font-normal">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <Textarea
            id="prompt"
            placeholder="Describe the image you want to generate in detail..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={isLoading}
            className="resize-none"
          />
          <PromptSuggestions onSelect={(suggestion) => setPrompt(suggestion)} />
        </div>

        <StyleSelector
          value={style}
          onChange={setStyle}
          disabled={isLoading}
        />

        <div className="space-y-2">
          <Label>Resolution</Label>
          <Select value={size} onValueChange={setSize} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="256x256">256x256 (Basic)</SelectItem>
              <SelectItem value="512x512">512x512 (Standard)</SelectItem>
              <SelectItem value="1024x1024" disabled={!isPaidUser}>
                <div className="flex items-center">
                  1024x1024 (HD)
                  {!isPaidUser && <Lock className="w-3 h-3 ml-2" />}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full"
          onClick={handleGenerate}
          disabled={isLoading || !prompt || !style || !size}
        >
          {isLoading ? (
            <>
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Image (10 Credits)
            </>
          )}
        </Button>

        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg">
            {error}
          </div>
        )}
      </Card>

      <ImagePreview
        image={generatedImage}
        isLoading={isLoading}
        isPaidUser={isPaidUser}
        onDownload={() => window.open(generatedImage, '_blank')}
      />
    </div>
  );
}