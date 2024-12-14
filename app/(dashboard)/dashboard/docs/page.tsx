"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  Code,
  FileText,
  Image as ImageIcon,
  Video,
  AudioWaveform,
  Search,
  ArrowRight,
} from "lucide-react";

export default function DocsPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of using NexusAI",
      links: ["Quick Start Guide", "Platform Overview", "Credits System"],
    },
    {
      title: "Image Tools",
      icon: ImageIcon,
      description: "Documentation for image generation and editing",
      links: ["Image Generation", "Image Enhancement", "Background Removal"],
    },
    {
      title: "Video Tools",
      icon: Video,
      description: "Learn about video creation and editing",
      links: ["Video Generation", "Video Editing", "Style Transfer"],
    },
    {
      title: "Content Tools",
      icon: FileText,
      description: "Guide to content generation features",
      links: ["Article Generation", "SEO Optimization", "Marketing Copy"],
    },
    {
      title: "Code Tools",
      icon: Code,
      description: "Documentation for code-related features",
      links: ["Code Generation", "Code Explanation", "Debugging"],
    },
    {
      title: "Audio Tools",
      icon: AudioWaveform,
      description: "Guide to audio generation and processing",
      links: ["Text to Speech", "Music Generation", "Audio Enhancement"],
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Documentation"
        text="Learn how to use NexusAI tools effectively"
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search documentation..."
              className="max-w-xl"
              type="search"
            />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium">{category.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link}>
                        <Button
                          variant="link"
                          className="p-0 h-auto font-normal text-primary hover:text-primary/80"
                        >
                          {link}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Need More Help?</h3>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Check out our community forum or contact support.
            </p>
            <div className="flex gap-4">
              <Button variant="outline">Visit Forum</Button>
              <Button>Contact Support</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}