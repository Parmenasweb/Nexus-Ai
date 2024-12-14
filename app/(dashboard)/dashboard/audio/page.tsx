"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AudioGenerator } from "@/components/tools/audio/AudioGenerator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AudioToolsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Audio Tools"
        text="Generate speech and music with AI"
      />
      <div className="grid gap-8">
        <Tabs defaultValue="speech" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="speech">Text to Speech</TabsTrigger>
            <TabsTrigger value="music">Music Generation</TabsTrigger>
          </TabsList>
          <TabsContent value="speech">
            <Card className="p-6">
              <AudioGenerator type="speech" />
            </Card>
          </TabsContent>
          <TabsContent value="music">
            <Card className="p-6">
              <AudioGenerator type="music" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}