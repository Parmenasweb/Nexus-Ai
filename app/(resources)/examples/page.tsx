"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Music,
  ArrowRight,
  Wand2,
  Layers,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    category: "Image AI",
    icon: ImageIcon,
    color: "bg-purple-500/10 text-purple-500",
    description:
      "Transform and generate images with state-of-the-art AI models",
    examples: [
      {
        title: "Product Image Generation",
        description:
          "Generate professional product photos from text descriptions",
        before:
          "Text prompt: A minimalist white ceramic coffee mug on a wooden table with morning light",
        after:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=400&fit=crop",
        results: [
          "Photorealistic product images",
          "Multiple angles and variations",
          "Custom backgrounds and lighting",
          "Brand-consistent styling",
        ],
      },
      {
        title: "Image Enhancement",
        description: "Enhance image quality and resolution automatically",
        before: "Low-resolution product photo with poor lighting",
        after:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=400&fit=crop",
        results: [
          "4x resolution increase",
          "Improved lighting and contrast",
          "Noise reduction",
          "Color correction",
        ],
      },
    ],
  },
  {
    category: "Video AI",
    icon: Video,
    color: "bg-blue-500/10 text-blue-500",
    description: "Create and enhance videos with advanced AI processing",
    examples: [
      {
        title: "Video Enhancement",
        description: "Enhance video quality and stability automatically",
        before: "Shaky, low-quality video footage",
        after:
          "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=400&fit=crop",
        results: [
          "Stabilized footage",
          "Increased resolution",
          "Frame interpolation",
          "Color grading",
        ],
      },
      {
        title: "Background Removal",
        description: "Remove and replace video backgrounds in real-time",
        before: "Green screen video footage",
        after:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop",
        results: [
          "Real-time processing",
          "No green screen needed",
          "Custom backgrounds",
          "Edge refinement",
        ],
      },
    ],
  },
  {
    category: "Content AI",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
    description: "Generate and optimize content with AI assistance",
    examples: [
      {
        title: "Blog Post Generation",
        description: "Generate SEO-optimized blog posts from outlines",
        before: "Topic: Benefits of AI in Healthcare",
        after:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
        results: [
          "2000+ word articles",
          "SEO optimization",
          "Custom tone and style",
          "Fact-checked content",
        ],
      },
      {
        title: "Product Descriptions",
        description: "Generate compelling product descriptions",
        before: "Basic product features list",
        after:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        results: [
          "Persuasive copy",
          "SEO keywords",
          "Multiple variations",
          "Brand voice matching",
        ],
      },
    ],
  },
  {
    category: "Code AI",
    icon: Code,
    color: "bg-orange-500/10 text-orange-500",
    description: "Generate and optimize code with AI assistance",
    examples: [
      {
        title: "React Component Generation",
        description: "Generate React components from descriptions",
        before: "Description: A responsive image gallery with lazy loading",
        after:
          "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=400&fit=crop",
        results: [
          "TypeScript support",
          "Best practices",
          "Accessibility features",
          "Responsive design",
        ],
      },
      {
        title: "API Integration",
        description: "Generate API integration code",
        before: "OpenAPI specification document",
        after:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        results: [
          "Type-safe code",
          "Error handling",
          "Documentation",
          "Testing setup",
        ],
      },
    ],
  },
  {
    category: "Audio AI",
    icon: Music,
    color: "bg-pink-500/10 text-pink-500",
    description: "Process and generate audio with AI technology",
    examples: [
      {
        title: "Audio Enhancement",
        description: "Enhance audio quality and remove noise",
        before: "Noisy podcast recording",
        after:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=400&fit=crop",
        results: [
          "Noise reduction",
          "Voice enhancement",
          "EQ optimization",
          "Volume normalization",
        ],
      },
      {
        title: "Text-to-Speech",
        description: "Generate natural-sounding voice overs",
        before: "Marketing script text",
        after:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop",
        results: [
          "Multiple voices",
          "Natural prosody",
          "Custom pacing",
          "Emotion control",
        ],
      },
    ],
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

export default function ExamplesPage() {
  const [selectedTool, setSelectedTool] = useState(tools[0]);

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
              AI Tools in Action
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Explore real-world examples of our AI tools transforming content,
              code, and media.
            </motion.p>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Tools Navigation */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-4">
            {tools.map((tool) => (
              <Button
                key={tool.category}
                variant={
                  selectedTool.category === tool.category
                    ? "default"
                    : "outline"
                }
                className="gap-2 whitespace-nowrap"
                onClick={() => setSelectedTool(tool)}
              >
                <tool.icon className="w-4 h-4" />
                {tool.category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Tool Examples */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <div
                className={`w-12 h-12 rounded-lg ${selectedTool.color} flex items-center justify-center`}
              >
                <selectedTool.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedTool.category}</h2>
                <p className="text-muted-foreground">
                  {selectedTool.description}
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {selectedTool.examples.map((example) => (
                <motion.div key={example.title} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {example.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {example.description}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Input
                          </h4>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                              {example.before}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            Output
                          </h4>
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image
                              src={example.after}
                              alt="Result"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Key Results
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {example.results.map((result) => (
                              <li
                                key={result}
                                className="flex items-center text-sm text-muted-foreground"
                              >
                                <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to Transform Your Work?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-8"
            >
              Start using our AI tools today and experience the power of
              AI-driven content creation.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/dashboard">Try It Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
