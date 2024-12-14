"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  AudioWaveformIcon,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    title: "Image Enhancement",
    description: "Enhance and transform your images",
    icon: ImageIcon,
    href: "/dashboard/image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Video Generation",
    description: "Create videos from text descriptions",
    icon: VideoIcon,
    href: "/dashboard/video",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Content Writing",
    description: "Generate engaging content",
    icon: FileTextIcon,
    href: "/dashboard/content",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Code Assistant",
    description: "Get help with coding tasks",
    icon: CodeIcon,
    href: "/dashboard/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Audio Generation",
    description: "Create audio from text",
    icon: AudioWaveformIcon,
    href: "/dashboard/audio",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

interface ToolsGridProps {
  className?: string;
}

export function ToolsGrid({ className }: ToolsGridProps) {
  return (
    <div className={className}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.title} className="p-4 md:p-6">
              <div className={`${tool.bgColor} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${tool.color}`} />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <Button className="w-full" variant="outline">
                Launch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}