"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  AudioWaveformIcon,
  History,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
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
    title: "Audio Tools",
    href: "/dashboard/audio",
    icon: AudioWaveformIcon,
  },
  {
    title: "Code Tools",
    href: "/dashboard/code",
    icon: CodeIcon,
  },
  {
    type: "divider",
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Credits & Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings2Icon,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="fixed h-screen flex-col border-r bg-background w-64 hidden md:flex">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">NexusAI</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto px-4">
        <nav className="grid items-start gap-2">
          {items.map((item, index) => {
            if (item.type === "divider") {
              return <div key={index} className="my-4 border-t" />;
            }

            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}