"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export default function CodeToolDocs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Code Generation</h1>
        <p className="text-lg text-muted-foreground">
          Generate high-quality code across multiple programming languages and
          frameworks using AI.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          Our code generation tool helps developers write, debug, and optimize
          code efficiently. Whether you need to create new functions, debug
          existing code, or convert between languages, our AI models can help
          streamline your development process.
        </p>

        <Alert>
          <AlertTitle>Credits Usage</AlertTitle>
          <AlertDescription>
            Credit consumption is based on the complexity and length of the code
            generated. Complex algorithms and large code blocks may use more
            credits.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Code Generation</h3>
              <Badge>Core</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate code in multiple languages with proper syntax,
              documentation, and error handling.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Code Conversion</h3>
              <Badge>Translation</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Convert code between different programming languages while
              maintaining functionality.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Debugging & Optimization</h3>
              <Badge>Advanced</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Identify and fix bugs, optimize performance, and improve code
              quality.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Supported Languages</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <Badge>JavaScript/TypeScript</Badge>
          </div>
          <div className="p-4 border rounded-lg">
            <Badge>Python</Badge>
          </div>
          <div className="p-4 border rounded-lg">
            <Badge>Java</Badge>
          </div>
          <div className="p-4 border rounded-lg">
            <Badge>C#</Badge>
          </div>
          <div className="p-4 border rounded-lg">
            <Badge>Go</Badge>
          </div>
          <div className="p-4 border rounded-lg">
            <Badge>Ruby</Badge>
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
              <li>Navigate to the Code Generation tool</li>
              <li>
                Select your task type:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Generate new code</li>
                  <li>Convert existing code</li>
                  <li>Debug/optimize code</li>
                </ul>
              </li>
              <li>
                Configure settings:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Programming language</li>
                  <li>Framework (if applicable)</li>
                  <li>Code style preferences</li>
                  <li>Documentation level</li>
                </ul>
              </li>
              <li>Enter your requirements or existing code</li>
              <li>Click &quot;Generate&quot; to create your code</li>
            </ol>
          </TabsContent>
          <TabsContent value="api" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the API</h3>
            <div className="space-y-4">
              <p>Make a POST request to our code generation endpoint:</p>
              <Code>
                {`POST /api/v1/code/generate
Content-Type: application/json

{
  "task": "generate",
  "language": "typescript",
  "framework": "react",
  "description": "Create a responsive navigation component with dropdown menu",
  "style": {
    "documentation": true,
    "typescript": true,
    "formatting": "prettier"
  }
}`}
              </Code>
              <p className="text-sm text-muted-foreground">
                The API will return the generated code with documentation and
                type definitions.
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
            <li>Be specific about functionality requirements</li>
            <li>Mention important dependencies or constraints</li>
            <li>Specify error handling requirements</li>
            <li>Include performance considerations</li>
          </ul>
        </div>
        <Alert>
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Break down complex features into smaller, focused components for
            better results. Always review and test generated code before using
            in production.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">React Component</h3>
            <Code>
              {`{
  "task": "generate",
  "language": "typescript",
  "framework": "react",
  "description": "Create a form component with email and password fields, validation, and submit handler",
  "style": {
    "documentation": true,
    "typescript": true,
    "styling": "tailwind"
  }
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">API Endpoint</h3>
            <Code>
              {`{
  "task": "generate",
  "language": "typescript",
  "framework": "express",
  "description": "Create a REST API endpoint for user authentication with JWT",
  "requirements": [
    "Email/password validation",
    "Password hashing",
    "JWT token generation",
    "Error handling"
  ]
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Database Query</h3>
            <Code>
              {`{
  "task": "generate",
  "language": "typescript",
  "framework": "prisma",
  "description": "Create queries for user profile CRUD operations with relations to posts and comments",
  "requirements": [
    "Include pagination",
    "Filter by user status",
    "Sort by creation date"
  ]
}`}
            </Code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Code Quality</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Quality Checks</h3>
            <ul className="mt-2 space-y-2 list-disc list-inside">
              <li>Syntax validation</li>
              <li>Type checking</li>
              <li>Best practices compliance</li>
              <li>Security considerations</li>
            </ul>
          </div>
          <Alert>
            <AlertTitle>Testing</AlertTitle>
            <AlertDescription>
              While our AI generates tested code, we recommend writing
              additional tests and performing thorough testing before deploying
              to production.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
