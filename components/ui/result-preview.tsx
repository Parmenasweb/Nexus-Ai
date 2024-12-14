"use client";

import { useState } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Download, Copy, Check } from "lucide-react";

interface ResultPreviewProps {
  content: string;
  type: "text" | "code" | "audio" | "video";
  downloadUrl?: string;
}

export function ResultPreview({ content, type, downloadUrl }: ResultPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-end space-x-2 mb-2">
        {type === "text" || type === "code" ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center space-x-1"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        ) : null}
        {downloadUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(downloadUrl, "_blank")}
            className="flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        )}
      </div>
      <div className={`${type === "code" ? "bg-muted p-4 rounded-lg" : ""}`}>
        {type === "code" ? (
          <pre className="overflow-x-auto">
            <code>{content}</code>
          </pre>
        ) : type === "text" ? (
          <div className="prose dark:prose-invert max-w-none">
            {content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : type === "audio" ? (
          <audio controls className="w-full">
            <source src={downloadUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <video controls className="w-full rounded-lg">
            <source src={downloadUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        )}
      </div>
    </Card>
  );
}