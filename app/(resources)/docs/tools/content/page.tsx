"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export default function ContentToolDocs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Content Generation</h1>
        <p className="text-lg text-muted-foreground">
          Generate high-quality, engaging content for various purposes using
          advanced AI models.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          Our content generation tool helps you create various types of written
          content, from blog posts and articles to marketing copy and social
          media content. Powered by advanced language models, it ensures
          high-quality, contextually relevant output.
        </p>

        <Alert>
          <AlertTitle>Credits Usage</AlertTitle>
          <AlertDescription>
            Credit consumption varies based on content length and complexity.
            Longer pieces and specialized content may use more credits.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Content Types</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Blog Posts & Articles</h3>
              <Badge>Long-form</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate well-structured, informative articles with proper
              formatting and citations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Marketing Copy</h3>
              <Badge>Persuasive</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Create compelling marketing materials, product descriptions, and
              ad copy.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Social Media</h3>
              <Badge>Engaging</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate platform-specific posts, captions, and hashtags optimized
              for engagement.
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
              <li>Navigate to the Content Generation tool</li>
              <li>
                Select content type:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Blog post/Article</li>
                  <li>Marketing copy</li>
                  <li>Social media content</li>
                  <li>Custom content</li>
                </ul>
              </li>
              <li>
                Configure parameters:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Topic/Subject</li>
                  <li>Tone and style</li>
                  <li>Length and format</li>
                  <li>Target audience</li>
                </ul>
              </li>
              <li>Add any specific requirements or guidelines</li>
              <li>Click &quot;Generate&quot; to create your content</li>
            </ol>
          </TabsContent>
          <TabsContent value="api" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the API</h3>
            <div className="space-y-4">
              <p>Make a POST request to our content generation endpoint:</p>
              <Code>
                {`POST /api/v1/content/generate
Content-Type: application/json

{
  "type": "blog_post",
  "topic": "AI in Healthcare",
  "tone": "professional",
  "length": "1500",
  "format": "markdown",
  "keywords": ["AI", "healthcare", "medical technology"],
  "target_audience": "healthcare professionals"
}`}
              </Code>
              <p className="text-sm text-muted-foreground">
                The API will return the generated content in your specified
                format.
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
            <li>Be specific about your requirements</li>
            <li>Define your target audience clearly</li>
            <li>Specify tone and style preferences</li>
            <li>Include key points to cover</li>
          </ul>
        </div>
        <Alert>
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Use the outline feature first to structure your content, then
            generate sections individually for better control over the final
            output.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Blog Post</h3>
            <Code>
              {`{
  "type": "blog_post",
  "topic": "Remote Work Best Practices",
  "tone": "professional yet friendly",
  "target_audience": "business professionals",
  "key_points": [
    "Setting up a productive workspace",
    "Time management techniques",
    "Communication tools and strategies"
  ]
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Product Description</h3>
            <Code>
              {`{
  "type": "marketing",
  "product": "Wireless Earbuds",
  "tone": "enthusiastic",
  "target_audience": "tech-savvy consumers",
  "key_features": [
    "Active noise cancellation",
    "30-hour battery life",
    "Water resistance"
  ]
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Social Media Post</h3>
            <Code>
              {`{
  "type": "social_media",
  "platform": "Instagram",
  "topic": "New Product Launch",
  "tone": "exciting",
  "include_hashtags": true,
  "call_to_action": "Shop now"
}`}
            </Code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Content Enhancement</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Available Enhancements</h3>
            <ul className="mt-2 space-y-2 list-disc list-inside">
              <li>SEO optimization</li>
              <li>Tone adjustment</li>
              <li>Grammar and style checking</li>
              <li>Format conversion</li>
            </ul>
          </div>
          <Alert>
            <AlertTitle>Quality Assurance</AlertTitle>
            <AlertDescription>
              While our AI generates high-quality content, we recommend
              reviewing and editing the output to ensure it perfectly matches
              your needs and brand voice.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
