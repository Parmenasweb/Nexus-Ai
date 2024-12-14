"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb } from "lucide-react";

interface PromptSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  "A serene landscape with mountains and a lake at sunset",
  "A futuristic cityscape with flying vehicles",
  "A magical forest with glowing mushrooms and fairy lights",
  "An abstract representation of human emotions",
  "A cyberpunk street scene with neon lights",
  "A detailed portrait in renaissance style",
];

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm text-muted-foreground">
        <Lightbulb className="w-4 h-4 mr-1" />
        Try these prompts
      </div>
      <ScrollArea className="h-20">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSelect(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}