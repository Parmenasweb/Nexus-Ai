"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  FileText,
  Video,
  Code,
  MessageSquare,
  Newspaper,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references",
    icon: FileText,
    href: "/docs",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Tutorials",
    description: "Step-by-step guides for getting started",
    icon: Video,
    href: "/tutorials",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Code Examples",
    description: "Real-world examples and snippets",
    icon: Code,
    href: "/examples",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Community",
    description: "Join our developer community",
    icon: MessageSquare,
    href: "/community",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Blog",
    description: "Latest updates and tech articles",
    icon: Newspaper,
    href: "/blog",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Best Practices",
    description: "Tips and recommendations",
    icon: Lightbulb,
    href: "/best-practices",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "Guides",
    description: "In-depth technical guides",
    icon: BookOpen,
    href: "/guides",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Academy",
    description: "Free courses and workshops",
    icon: GraduationCap,
    href: "/academy",
    color: "bg-red-500/10 text-red-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Resources & Learning
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Everything you need to master NexusAI. From documentation to
              tutorials, we&apos;ve got you covered.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tutorials">Start Learning</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {resources.map((resource) => (
              <motion.div key={resource.title} variants={itemVariants}>
                <Link href={resource.href}>
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col h-full">
                      <div
                        className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center mb-4`}
                      >
                        <resource.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground flex-grow">
                        {resource.description}
                      </p>
                      <div className="flex items-center mt-4 text-primary">
                        <span className="text-sm font-medium">Learn more</span>
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Stay Updated
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-8"
            >
              Subscribe to our newsletter for the latest resources, tutorials,
              and AI insights.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
