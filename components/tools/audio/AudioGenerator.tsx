"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/hooks/use-credits";
import { generateSpeech, generateMusic } from "@/lib/api/deepai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioGeneratorProps {
  type: "speech" | "music";
}

export function AudioGenerator({ type }: AudioGeneratorProps) {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState(30);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } = useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const getCost = () => type === "speech" ? 8 : 15;

  const handleGenerate = async () => {
    const cost = getCost();

    if (!text || (type === "speech" && (!voice || !language)) || (type === "music" && !genre)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

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

      let url;
      if (type === "speech") {
        url = await generateSpeech(text, voice, language);
      } else {
        url = await generateMusic(text, genre, duration);
      }

      setAudioUrl(url);
      deductCredits(cost);

      toast({
        title: "Success",
        description: `${type === "speech" ? "Speech" : "Music"} generated successfully`,
      });
    } catch (err) {
      setLoadingError(err instanceof Error ? err.message : "Failed to generate audio");
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      stopLoading();
    }
  };

  if (type === "speech") {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="text">Text to Convert</Label>
          <Textarea
            id="text"
            placeholder="Enter the text you want to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Voice</Label>
            <Select value={voice} onValueChange={setVoice} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male1">Male 1</SelectItem>
                <SelectItem value="male2">Male 2</SelectItem>
                <SelectItem value="female1">Female 1</SelectItem>
                <SelectItem value="female2">Female 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleGenerate}
          disabled={isLoading || !text || !voice || !language}
        >
          {isLoading ? "Generating..." : "Generate Speech (8 Credits)"}
        </Button>

        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {audioUrl && (
          <div className="mt-6 space-y-2">
            <Label>Generated Audio</Label>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="prompt">Music Description</Label>
        <Textarea
          id="prompt"
          placeholder="Describe the type of music you want to generate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Genre</Label>
          <Select value={genre} onValueChange={setGenre} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ambient">Ambient</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="classical">Classical</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Duration (seconds): {duration}</Label>
        <Slider
          value={[duration]}
          onValueChange={(value) => setDuration(value[0])}
          min={15}
          max={120}
          step={15}
          disabled={isLoading}
        />
      </div>

      <Button 
        className="w-full" 
        onClick={handleGenerate}
        disabled={isLoading || !text || !genre}
      >
        {isLoading ? "Generating..." : "Generate Music (15 Credits)"}
      </Button>

      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="mt-6 space-y-2">
          <Label>Generated Music</Label>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}