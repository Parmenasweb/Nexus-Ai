"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ContentGenerator } from "@/components/tools/content/ContentGenerator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentToolsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Content Tools"
        text="Generate high-quality content for any purpose"
      />
      <div className="grid gap-8">
        <Tabs defaultValue="article" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <Card className="p-6">
              <ContentGenerator type="article" />
            </Card>
          </TabsContent>
          <TabsContent value="social">
            <Card className="p-6">
              <ContentGenerator type="social" />
            </Card>
          </TabsContent>
          <TabsContent value="marketing">
            <Card className="p-6">
              <ContentGenerator type="marketing" />
            </Card>
          </TabsContent>
          <TabsContent value="seo">
            <Card className="p-6">
              <ContentGenerator type="seo" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}