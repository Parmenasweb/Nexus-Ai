"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export default function ImageToolDocs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Image Generation</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use our powerful image generation tools to create
          stunning visuals using AI.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          Our image generation tool provides multiple AI models to create images
          from text descriptions. You can choose between different providers and
          customize various parameters to get the exact results you want.
        </p>

        <Alert>
          <AlertTitle>Credits Usage</AlertTitle>
          <AlertDescription>
            Image generation consumes credits based on the model and options
            selected. Check your usage in the dashboard to monitor credit
            consumption.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Models</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">DALL-E</h3>
              <Badge>OpenAI</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              High-quality image generation with excellent understanding of
              complex prompts and artistic styles.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Stable Diffusion</h3>
              <Badge>DeepAI</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Versatile image generation with fine control over artistic style
              and composition.
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
              <li>Navigate to the Image Generation tool in your dashboard</li>
              <li>
                Upload a reference image (optional) or skip to text prompt
              </li>
              <li>
                Enter your detailed text prompt describing the desired image
              </li>
              <li>Select your preferred AI model</li>
              <li>
                Adjust generation parameters:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Image size (width x height)</li>
                  <li>Number of variations</li>
                  <li>Style preferences</li>
                  <li>Quality settings</li>
                </ul>
              </li>
              <li>Click &quot;Generate&quot; and wait for your results</li>
            </ol>
          </TabsContent>
          <TabsContent value="api" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the API</h3>
            <div className="space-y-4">
              <p>Make a POST request to our image generation endpoint:</p>
              <Code>
                {`POST /api/v1/image/generate
Content-Type: application/json

{
  "prompt": "A serene landscape with mountains at sunset",
  "model": "dall-e",
  "width": 1024,
  "height": 1024,
  "n": 1,
  "quality": "standard"
}`}
              </Code>
              <p className="text-sm text-muted-foreground">
                The API will return a JSON response with the generated image
                URLs and metadata.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Writing Effective Prompts</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Be specific about visual details</li>
            <li>Include artistic style references</li>
            <li>Specify lighting and composition</li>
            <li>Mention camera angle and distance</li>
          </ul>
        </div>
        <Alert>
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Start with a basic prompt and iteratively refine it based on the
            results. Save your favorite prompts for future use.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Portrait Photography</h3>
            <Code>
              &quot;Professional headshot of a middle-aged businessman, wearing
              a navy suit, natural lighting, shallow depth of field, high-end
              DSLR quality, 4k&quot;
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Product Photography</h3>
            <Code>
              &quot;Minimalist product photo of a white ceramic coffee mug on a
              light gray background, soft shadows, studio lighting, commercial
              photography style&quot;
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Digital Art</h3>
            <Code>
              &quot;Cyberpunk cityscape at night, neon lights, flying cars,
              detailed, trending on ArtStation, 8k resolution&quot;
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
              <li>Results don&apos;t match the prompt</li>
              <li>Generation takes too long</li>
              <li>Image quality is low</li>
            </ul>
          </div>
          <Alert>
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              Contact our support team or visit our community forum for
              additional assistance with image generation.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
