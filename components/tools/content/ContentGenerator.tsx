"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { ContentForm, ContentFormData } from "./ContentForm";
import { ContentPreview } from "./ContentPreview";
import { generateContent } from "@/lib/api/falai";

interface ContentGeneratorProps {
  type: "article" | "social" | "marketing" | "seo";
}

export function ContentGenerator({ type }: ContentGeneratorProps) {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } =
    useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const getCost = () => {
    switch (type) {
      case "article":
        return 15;
      case "social":
        return 5;
      case "marketing":
        return 10;
      case "seo":
        return 8;
      default:
        return 10;
    }
  };

  const handleGenerate = async (formData: ContentFormData) => {
    const cost = getCost();

    if (!hasEnoughCredits(cost)) {
      toast({
        title: "Insufficient Credits",
        description: "Please upgrade your plan to get more credits",
        variant: "destructive",
      });
      return;
    }

    try {
      startLoading();

      const prompt = constructPrompt(type, formData);
      const contentRequest = {
        type,
        prompt,
      };
      const content = await generateContent(contentRequest);

      setGeneratedContent(content);
      deductCredits(cost);

      toast({
        title: "Success",
        description: "Content generated successfully",
      });
    } catch (err) {
      setLoadingError(
        err instanceof Error ? err.message : "Failed to generate content"
      );
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      stopLoading();
    }
  };

  const constructPrompt = (type: string, data: ContentFormData): string => {
    let prompt = "";

    switch (type) {
      case "social":
        prompt = `Create a ${data.platform} post about ${data.topic}.
          Tone: ${data.tone}
          Target Audience: ${data.targetAudience}
          Keywords: ${data.keywords}
          Call to Action: ${data.callToAction}
          Media Type: ${data.mediaType}
          Hashtags to include: ${data.hashtags}
          
          Please write a compelling social media post that engages the target audience
          and encourages them to take action. Consider the platform's best practices
          and character limits.`;
        break;

      case "article":
        prompt = `Write a ${data.contentLength} article about ${data.topic}.
          Tone: ${data.tone}
          Target Audience: ${data.targetAudience}
          Keywords to include: ${data.keywords}
          Call to Action: ${data.callToAction}
          
          Please write an engaging article that provides value to the reader,
          incorporates the keywords naturally, and ends with a clear call to action.
          The article should be well-structured with appropriate headings and
          paragraphs.`;
        break;

      case "marketing":
        prompt = `Create marketing copy about ${data.topic}.
          Tone: ${data.tone}
          Target Audience: ${data.targetAudience}
          Keywords: ${data.keywords}
          Call to Action: ${data.callToAction}
          
          Please write persuasive marketing copy that highlights the benefits,
          addresses pain points, and motivates the target audience to take action.
          The copy should be compelling and conversion-focused.`;
        break;

      case "seo":
        prompt = `Write SEO-optimized content about ${data.topic}.
          Target Keywords: ${data.keywords}
          Target Audience: ${data.targetAudience}
          Tone: ${data.tone}
          Call to Action: ${data.callToAction}
          
          Please write content that naturally incorporates the target keywords
          while providing valuable information to the reader. Include appropriate
          headings, meta description suggestions, and internal linking
          opportunities.`;
        break;
    }

    return prompt;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <ContentForm
          type={type}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
      </Card>

      <Card className="p-6">
        <ContentPreview
          content={generatedContent}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
}
