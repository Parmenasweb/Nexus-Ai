"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  AudioWaveformIcon,
  BookOpenIcon,
  CodepenIcon,
  NewspaperIcon,
  BuildingIcon,
  Users2Icon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const routes = [
  {
    name: "Products",
    children: [
      { name: "Image Tools", path: "/dashboard/image" },
      { name: "Video Tools", path: "/dashboard/video" },
      { name: "Content Tools", path: "/dashboard/content" },
      { name: "Audio Tools", path: "/dashboard/audio" },
      { name: "Code Tools", path: "/dashboard/code" },
    ],
  },
  {
    name: "Solutions",
    children: [
      { name: "For Creators", path: "/solutions/creators" },
      { name: "For Developers", path: "/solutions/developers" },
      { name: "For Enterprise", path: "/solutions/enterprise" },
    ],
  },
  {
    name: "Resources",
    children: [
      { name: "Documentation", path: "/docs" },
      { name: "API Reference", path: "/docs/api" },
      { name: "Examples", path: "/examples" },
      { name: "Blog", path: "/blog" },
    ],
  },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text pl-3">
            NexusAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {routes.map((route) => {
            if (route.children) {
              return (
                <div
                  key={route.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(route.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-sm p-3 font-medium transition-colors hover:text-primary">
                    {route.name}
                  </button>
                  {activeDropdown === route.name && (
                    <div className="absolute top-full left-0 w-48 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {route.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block px-4 py-2 text-sm hover:bg-accent"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={route.path}
                href={route.path!}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {route.name}
              </Link>
            );
          })}
          <ThemeToggle />
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden bg-background"
          >
            <div className="container py-4">
              <Accordion type="single" collapsible className="space-y-2">
                {routes.map((route, idx) => {
                  if (route.children) {
                    return (
                      <AccordionItem
                        key={route.name}
                        value={`item-${idx}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="flex items-center py-2 hover:no-underline">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{route.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-2">
                            {route.children.map((child) => (
                              <Link
                                key={child.path}
                                href={child.path}
                                className="flex items-center space-x-2 py-2 text-sm text-muted-foreground hover:text-primary"
                                onClick={() => setIsOpen(false)}
                              >
                                <span>{child.name}</span>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }
                  return (
                    <Link
                      key={route.name}
                      href={route.path!}
                      className="flex items-center space-x-2 py-2 text-sm font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{route.name}</span>
                    </Link>
                  );
                })}
              </Accordion>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full" asChild>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
