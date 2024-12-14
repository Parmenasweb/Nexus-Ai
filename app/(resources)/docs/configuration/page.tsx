"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle } from "lucide-react";

const envVariables = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    description: "Your Supabase project URL",
    example: "https://your-project.supabase.co",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    description: "Your Supabase anonymous key",
    example: "your-anon-key",
  },
  {
    name: "DATABASE_URL",
    required: true,
    description: "Your PostgreSQL database URL",
    example: "postgresql://user:password@localhost:5432/db",
  },
  {
    name: "NEXT_PUBLIC_APP_URL",
    required: true,
    description: "Your application URL",
    example: "http://localhost:3000",
  },
  {
    name: "STRIPE_SECRET_KEY",
    required: true,
    description: "Your Stripe secret key",
    example: "sk_test_...",
  },
  {
    name: "STRIPE_WEBHOOK_SECRET",
    required: true,
    description: "Your Stripe webhook secret",
    example: "whsec_...",
  },
  {
    name: "NEXT_PUBLIC_FAL_KEY",
    required: true,
    description: "Your Fal.ai API key",
    example: "fal_...",
  },
  {
    name: "NEXT_PUBLIC_OPENAI_API_KEY",
    required: true,
    description: "Your OpenAI API key",
    example: "sk-...",
  },
  {
    name: "NEXT_PUBLIC_DEEPAI_API_KEY",
    required: true,
    description: "Your DeepAI API key",
    example: "quickstart-...",
  },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="p-4 rounded-lg bg-accent font-mono text-sm overflow-x-auto">
      {children}
    </pre>
  );
}

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Configuration</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to configure and set up Nexus AI for your environment.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Make sure to keep your API keys and sensitive information secure.
          Never commit them to version control or expose them in client-side
          code.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="env" className="space-y-4">
        <TabsList>
          <TabsTrigger value="env">Environment Variables</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="env">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Environment Variables</h2>
                <p className="text-muted-foreground">
                  Configure these environment variables in your .env file:
                </p>
              </div>

              <div className="grid gap-4">
                {envVariables.map((variable) => (
                  <div
                    key={variable.name}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-semibold">
                          {variable.name}
                        </code>
                        {variable.required && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {variable.description}
                      </p>
                    </div>
                    <div>
                      <CodeBlock>{`${variable.name}=${variable.example}`}</CodeBlock>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Setup Guide</h2>
                <p className="text-muted-foreground">
                  Follow these steps to set up your development environment:
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    1. Clone the Repository
                  </h3>
                  <CodeBlock>
                    {`git clone https://github.com/yourusername/nexus-ai.git
cd nexus-ai`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    2. Install Dependencies
                  </h3>
                  <CodeBlock>
                    {`npm install
# or
yarn install`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    3. Configure Environment Variables
                  </h3>
                  <CodeBlock>
                    {`cp .env.example .env.local
# Edit .env.local with your values`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">4. Set Up Database</h3>
                  <CodeBlock>
                    {`npx prisma generate
npx prisma db push`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    5. Start Development Server
                  </h3>
                  <CodeBlock>
                    {`npm run dev
# or
yarn dev`}
                  </CodeBlock>
                </div>
              </div>

              <Alert
                variant="default"
                className="bg-primary/10 border-primary/20"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your development environment should now be ready! Visit{" "}
                  <code className="text-sm">http://localhost:3000</code> to see
                  your application.
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
