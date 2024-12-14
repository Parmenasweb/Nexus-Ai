"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  AudioWaveformIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  Settings2Icon,
  MenuIcon,
  DollarSignIcon,
  ClockIcon,
  BookOpenIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const mainNav: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3Icon,
  },
];

const toolsNav: NavItem[] = [
  {
    title: "Image Tools",
    href: "/dashboard/image",
    icon: ImageIcon,
  },
  {
    title: "Video Tools",
    href: "/dashboard/video",
    icon: VideoIcon,
  },
  {
    title: "Content Tools",
    href: "/dashboard/content",
    icon: FileTextIcon,
  },
  {
    title: "Code Tools",
    href: "/dashboard/code",
    icon: CodeIcon,
  },
  {
    title: "Audio Tools",
    href: "/dashboard/audio",
    icon: AudioWaveformIcon,
  },
];

const additionalNav: NavItem[] = [
  {
    title: "History",
    href: "/dashboard/history",
    icon: ClockIcon,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: DollarSignIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings2Icon,
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: BookOpenIcon,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Nexus AI</h2>
        </div>
        {mobileOpen && (
          <div className="border-b bg-background">
            <nav className="space-y-1 p-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                    pathname === item.href && "bg-accent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <h2 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
                AI Tools
              </h2>
              <nav className="space-y-1">
                {toolsNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href && "bg-accent"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={cn(
            "hidden md:flex flex-col border-r bg-background",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <div className="flex h-16 items-center border-b px-4">
            {!collapsed && <h2 className="text-lg font-semibold">Nexus AI</h2>}
            <Button
              variant="ghost"
              size="icon"
              className={cn("ml-auto", collapsed && "mx-auto")}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Settings2Icon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-4 p-2">
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                    pathname === item.href && "bg-accent",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
            <div className="px-3 py-2">
              <h2
                className={cn(
                  "mb-2 text-xs font-semibold text-muted-foreground",
                  collapsed && "text-center"
                )}
              >
                {!collapsed ? "AI Tools" : "Tools"}
              </h2>
              <nav className="space-y-1">
                {toolsNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href && "bg-accent",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                ))}
              </nav>
              <h2 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
                others
              </h2>
              <nav className="space-y-3">
                {additionalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href && "bg-accent",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="md:h-16 h-16 border-b" />
          <main className="container py-6 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
