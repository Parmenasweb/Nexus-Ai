"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { initializeFalAI } from "@/lib/config/fal";
import {
  ChevronDown,
  BookOpen,
  Code,
  Cpu,
  Image,
  Video,
  FileText,
  Settings,
  Key,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Authentication", href: "/docs/authentication" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "REST API", href: "/docs/api/rest" },
      { title: "Authentication", href: "/docs/api/authentication" },
      { title: "Rate Limits", href: "/docs/api/rate-limits" },
      { title: "Error Handling", href: "/docs/api/errors" },
    ],
  },
  {
    title: "Tools & Features",
    items: [
      { title: "Image Generation", href: "/docs/tools/image" },
      { title: "Video Generation", href: "/docs/tools/video" },
      { title: "Content Generation", href: "/docs/tools/content" },
      { title: "Code Generation", href: "/docs/tools/code" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Best Practices", href: "/docs/guides/best-practices" },
      { title: "Credits System", href: "/docs/guides/credits" },
      { title: "Usage Limits", href: "/docs/guides/limits" },
      { title: "Troubleshooting", href: "/docs/guides/troubleshooting" },
    ],
  },
];

function DocsSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="w-64 h-full border-r bg-background">
      <div className="flex items-center gap-2 p-6 border-b">
        <BookOpen className="h-6 w-6" />
        <h2 className="font-semibold">Documentation</h2>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((section) => (
          <div key={section.title} className="space-y-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full p-2 text-sm font-medium rounded-lg hover:bg-accent"
            >
              {section.title}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openSections.includes(section.title) && "rotate-180"
                )}
              />
            </button>
            {openSections.includes(section.title) && (
              <div className="ml-4 space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block p-2 text-sm rounded-lg hover:bg-accent",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeFalAI();
  }, []);
  return (
    <div className="flex min-h-screen">
      <DocsSidebar />
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}
