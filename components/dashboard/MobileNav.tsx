"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-3 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-bold">NexusAI</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2">
            {items.map((item, index) => {
              if (item.type === "divider") {
                return <div key={index} className="my-4 border-t" />;
              }

              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}