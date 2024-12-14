"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CodeAssistant } from "@/components/tools/code/CodeAssistant";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CodeToolsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Code Tools"
        text="Get AI assistance with your coding tasks"
      />
      <div className="grid gap-8">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="explain">Explain</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <Card className="p-6">
              <CodeAssistant type="generate" />
            </Card>
          </TabsContent>
          <TabsContent value="explain">
            <Card className="p-6">
              <CodeAssistant type="explain" />
            </Card>
          </TabsContent>
          <TabsContent value="debug">
            <Card className="p-6">
              <CodeAssistant type="debug" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}