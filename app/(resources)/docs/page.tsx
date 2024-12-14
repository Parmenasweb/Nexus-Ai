"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const quickLinks = [
  {
    title: "Getting Started",
    description: "Learn how to get started with Nexus AI and its features",
    href: "/docs/installation",
  },
  {
    title: "API Reference",
    description: "Explore our API documentation and integration guides",
    href: "/docs/api/rest",
  },
  {
    title: "Tools Guide",
    description: "Discover our AI-powered tools and how to use them",
    href: "/docs/tools/image",
  },
  {
    title: "Best Practices",
    description: "Learn best practices and optimization techniques",
    href: "/docs/guides/best-practices",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">
          Welcome to Nexus AI Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to integrate and use Nexus AI&apos;s powerful features in
          your applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="p-6 h-full hover:bg-accent transition-colors">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{link.title}</h2>
                <p className="text-muted-foreground">{link.description}</p>
                <div className="flex items-center text-primary">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What&apos;s New</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              New
            </span>
            <p>Video Generation API now supports 4K resolution</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              Update
            </span>
            <p>Improved image generation quality and speed</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              Fix
            </span>
            <p>Fixed rate limiting issues in the API</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Popular Guides</h2>
        <div className="space-y-2">
          <Link
            href="/docs/guides/best-practices"
            className="block p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold">Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to optimize your usage and follow best practices
            </p>
          </Link>
          <Link
            href="/docs/guides/credits"
            className="block p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold">Credits System</h3>
            <p className="text-sm text-muted-foreground">
              Understanding how credits work and how to manage them
            </p>
          </Link>
          <Link
            href="/docs/guides/troubleshooting"
            className="block p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold">Troubleshooting</h3>
            <p className="text-sm text-muted-foreground">
              Common issues and how to resolve them
            </p>
          </Link>
        </div>
      </div>

      <div className="rounded-lg border p-6 bg-accent">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Support
          </Link>
          <Link
            href="https://github.com/yourusername/nexus-ai/issues"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
