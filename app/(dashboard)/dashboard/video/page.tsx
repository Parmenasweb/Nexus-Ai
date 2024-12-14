"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VideoGenerator } from "@/components/tools/video/VideoGenerator";
import { SocialMediaShortsGenerator } from "@/components/tools/video/SocialMediaShortsGenerator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VideoToolsPage() {
  const [activeTab, setActiveTab] = useState("videoGenerator");

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Video Tools"
        text="Generate and edit videos using AI"
      />
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="videoGenerator">Video Generator</TabsTrigger>
            <TabsTrigger value="socialMediaShorts">
              Social Media Shorts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videoGenerator">
            <VideoGenerator />
          </TabsContent>
          <TabsContent value="socialMediaShorts">
            <SocialMediaShortsGenerator />
          </TabsContent>
        </Tabs>
      </Card>
    </DashboardShell>
  );
}
