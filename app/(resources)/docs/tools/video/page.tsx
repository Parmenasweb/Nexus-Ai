"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export default function VideoToolDocs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Video Generation</h1>
        <p className="text-lg text-muted-foreground">
          Create stunning AI-powered videos from text descriptions or transform
          existing videos.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          Our video generation tool allows you to create professional-quality
          videos using AI. Whether you&apos;re starting from scratch with a text
          description or transforming existing footage, our tool provides
          powerful options for video creation.
        </p>

        <Alert>
          <AlertTitle>Credits Usage</AlertTitle>
          <AlertDescription>
            Video generation typically consumes more credits than other tools
            due to its complexity. Monitor your usage in the dashboard.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Text-to-Video</h3>
              <Badge>Core Feature</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate videos from detailed text descriptions, controlling
              style, duration, and quality.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Video Enhancement</h3>
              <Badge>Advanced</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Upscale resolution, improve quality, and add special effects to
              existing videos.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Style Transfer</h3>
              <Badge>Creative</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Apply artistic styles to your videos, transforming them into
              different visual aesthetics.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How to Use</h2>
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the Dashboard</h3>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Navigate to the Video Generation tool in your dashboard</li>
              <li>
                Choose your generation method:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Text-to-Video: Enter a detailed description</li>
                  <li>Video Enhancement: Upload your source video</li>
                  <li>Style Transfer: Upload video and select style</li>
                </ul>
              </li>
              <li>
                Configure video parameters:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Duration (seconds)</li>
                  <li>Resolution</li>
                  <li>Frame rate</li>
                  <li>Quality settings</li>
                </ul>
              </li>
              <li>Click &quot;Generate&quot; and wait for processing</li>
            </ol>
          </TabsContent>
          <TabsContent value="api" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the API</h3>
            <div className="space-y-4">
              <p>Make a POST request to our video generation endpoint:</p>
              <Code>
                {`POST /api/v1/video/generate
Content-Type: application/json

{
  "prompt": "A cinematic sunset over a bustling city skyline",
  "duration": 10,
  "resolution": "1080p",
  "fps": 30,
  "quality": "high"
}`}
              </Code>
              <p className="text-sm text-muted-foreground">
                The API will return a JSON response with the processing status
                and final video URL.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Writing Video Prompts</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Describe the scene in chronological order</li>
            <li>Specify camera movements and transitions</li>
            <li>Include details about lighting and atmosphere</li>
            <li>Mention any specific visual effects</li>
          </ul>
        </div>
        <Alert>
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            For best results, break down complex scenes into smaller segments
            and generate them separately before combining.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Cinematic Scene</h3>
            <Code>
              &quot;Aerial drone shot slowly moving forward over a dense forest
              at sunrise, morning mist rising between trees, cinematic quality,
              golden hour lighting&quot;
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Product Showcase</h3>
            <Code>
              &quot;360-degree rotation of a sleek smartphone on a glossy black
              surface, soft studio lighting, product showcase style, 4k
              quality&quot;
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Abstract Animation</h3>
            <Code>
              &quot;Flowing abstract shapes morphing smoothly between forms,
              vibrant gradient colors, particle effects, modern motion graphics
              style&quot;
            </Code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Common Issues</h3>
            <ul className="mt-2 space-y-2 list-disc list-inside">
              <li>Long processing times</li>
              <li>Inconsistent frame transitions</li>
              <li>Quality variations in output</li>
            </ul>
          </div>
          <Alert>
            <AlertTitle>Processing Times</AlertTitle>
            <AlertDescription>
              Video generation can take several minutes depending on duration
              and quality settings. You&apos;ll receive a notification when your
              video is ready.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
