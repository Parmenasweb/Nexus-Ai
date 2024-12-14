"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const endpoints = [
  {
    method: "POST",
    path: "/api/image/generate",
    title: "Generate Image",
    description: "Generate an image using AI",
    parameters: [
      {
        name: "prompt",
        type: "string",
        required: true,
        description: "The description of the image to generate",
      },
      {
        name: "size",
        type: "string",
        required: false,
        description: "The size of the image (default: 1024x1024)",
      },
      {
        name: "style",
        type: "string",
        required: false,
        description: "The style of the image",
      },
    ],
    response: {
      success: {
        status: 200,
        body: {
          id: "img_123",
          url: "https://example.com/image.png",
          prompt: "A beautiful sunset",
          credits: 1,
        },
      },
      error: {
        status: 400,
        body: {
          error: {
            message: "Invalid prompt",
            code: "INVALID_PROMPT",
          },
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/video/generate",
    title: "Generate Video",
    description: "Generate a video using AI",
    parameters: [
      {
        name: "prompt",
        type: "string",
        required: true,
        description: "The description of the video to generate",
      },
      {
        name: "duration",
        type: "number",
        required: false,
        description: "The duration in seconds (default: 10)",
      },
      {
        name: "resolution",
        type: "string",
        required: false,
        description: "The video resolution (default: 1080p)",
      },
    ],
    response: {
      success: {
        status: 200,
        body: {
          id: "vid_123",
          url: "https://example.com/video.mp4",
          prompt: "A flowing river",
          credits: 5,
        },
      },
      error: {
        status: 400,
        body: {
          error: {
            message: "Invalid duration",
            code: "INVALID_DURATION",
          },
        },
      },
    },
  },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="p-4 rounded-lg bg-accent font-mono text-sm overflow-x-auto">
      {children}
    </pre>
  );
}

function EndpointCard({ endpoint }: { endpoint: (typeof endpoints)[0] }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{endpoint.title}</CardTitle>
            <CardDescription>{endpoint.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                endpoint.method === "GET"
                  ? "default"
                  : endpoint.method === "POST"
                  ? "destructive"
                  : "secondary"
              }
            >
              {endpoint.method}
            </Badge>
            <code className="px-2 py-1 rounded bg-accent">{endpoint.path}</code>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="parameters" className="space-y-4">
          <TabsList>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Request Parameters</h3>
              <div className="grid gap-4">
                {endpoint.parameters.map((param) => (
                  <div
                    key={param.name}
                    className="grid grid-cols-4 items-start gap-4"
                  >
                    <div>
                      <code className="text-sm">{param.name}</code>
                      {param.required && (
                        <Badge variant="destructive" className="ml-2">
                          Required
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {param.type}
                    </div>
                    <div className="col-span-2 text-sm">
                      {param.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="response">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Success Response</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      {endpoint.response.success.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Success Response
                    </span>
                  </div>
                  <CodeBlock>
                    {JSON.stringify(endpoint.response.success.body, null, 2)}
                  </CodeBlock>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Error Response</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">
                      {endpoint.response.error.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Error Response
                    </span>
                  </div>
                  <CodeBlock>
                    {JSON.stringify(endpoint.response.error.body, null, 2)}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="example">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Example Request</h3>
              <CodeBlock>
                {`fetch("${process.env.NEXT_PUBLIC_APP_URL}${endpoint.path}", {
  method: "${endpoint.method}",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    ${endpoint.parameters
      .map(
        (param) =>
          `${param.name}: "${
            param.name === "prompt" ? "Example prompt" : "example"
          }"`
      )
      .join(",\n    ")}
  })
})`}
              </CodeBlock>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">REST API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Explore our REST API endpoints and learn how to integrate them into
          your applications.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Authentication</h2>
        <p className="text-muted-foreground">
          All API requests require authentication using an API key. Include your
          API key in the Authorization header of your requests.
        </p>
        <CodeBlock>{`Authorization: Bearer YOUR_API_KEY`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Base URL</h2>
        <p className="text-muted-foreground">
          All API requests should be made to:
        </p>
        <CodeBlock>
          {process.env.NEXT_PUBLIC_APP_URL || "https://api.nexusai.com"}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        {endpoints.map((endpoint) => (
          <EndpointCard key={endpoint.path} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
}
