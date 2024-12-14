"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/hooks/use-loading";
import { useCredits } from "@/lib/hooks/use-credits";
import { generateCode, explainCode, debugCode } from "@/lib/api/falai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeAssistantProps {
  type: "generate" | "explain" | "debug";
}

export function CodeAssistant({ type }: CodeAssistantProps) {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [result, setResult] = useState("");

  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading, error, setLoadingError } =
    useLoading();
  const { credits, deductCredits, hasEnoughCredits } = useCredits();

  const getCost = () => {
    switch (type) {
      case "generate":
        return 10;
      case "explain":
        return 5;
      case "debug":
        return 8;
      default:
        return 10;
    }
  };

  const handleSubmit = async () => {
    const cost = getCost();

    if (!input || !language) {
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

      let response;
      switch (type) {
        case "generate":
          response = await generateCode({
            prompt: input,
            language: language,
            framework: framework,
          });
          break;
        case "explain":
          response = await explainCode({
            code: input,
            language: language,
          });
          break;
        case "debug":
          response = await debugCode({
            code: input,
            language: language,
          });
          break;
      }

      setResult(response || "");
      deductCredits(cost);

      toast({
        title: "Success",
        description: `Code ${type}d successfully`,
      });
    } catch (err) {
      setLoadingError(
        err instanceof Error ? err.message : `Failed to ${type} code`
      );
      toast({
        title: "Error",
        description: `Failed to ${type} code. Please try again.`,
        variant: "destructive",
      });
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="code">
          {type === "generate" ? "Description" : "Code"}
        </Label>
        <Textarea
          id="code"
          placeholder={
            type === "generate"
              ? "Describe the code you want to generate..."
              : "Paste your code here..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          className="font-mono"
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={language}
            onValueChange={setLanguage}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === "generate" && (
          <div className="space-y-2">
            <Label>Framework</Label>
            <Select
              value={framework}
              onValueChange={setFramework}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={isLoading || !input || !language}
      >
        {isLoading
          ? "Processing..."
          : type === "generate"
          ? "Generate Code (10 Credits)"
          : type === "explain"
          ? "Explain Code (5 Credits)"
          : "Debug Code (8 Credits)"}
      </Button>

      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-2">
          <Label>Result</Label>
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
