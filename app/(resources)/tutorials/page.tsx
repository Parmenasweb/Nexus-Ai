"use client";

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
  Clock,
  Sparkles,
  PlayCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const tutorials = [
  {
    category: "Image Generation & Enhancement",
    icon: ImageIcon,
    color: "bg-purple-500/10 text-purple-500",
    tutorials: [
      {
        title: "Creating Professional Product Images",
        description:
          "Learn how to generate and enhance product images for e-commerce",
        duration: "15 min",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
        href: "/tutorials/product-images",
      },
      {
        title: "AI-Powered Image Upscaling",
        description:
          "Master the art of enhancing image resolution without quality loss",
        duration: "20 min",
        level: "Intermediate",
        image:
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop",
        href: "/tutorials/image-upscaling",
      },
    ],
  },
  {
    category: "Video Processing",
    icon: Video,
    color: "bg-blue-500/10 text-blue-500",
    tutorials: [
      {
        title: "Video Enhancement and Stabilization",
        description:
          "Transform shaky, low-quality videos into professional content",
        duration: "25 min",
        level: "Intermediate",
        image:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop",
        href: "/tutorials/video-enhancement",
      },
      {
        title: "AI Video Background Removal",
        description: "Learn to remove and replace video backgrounds seamlessly",
        duration: "30 min",
        level: "Advanced",
        image:
          "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop",
        href: "/tutorials/video-background",
      },
    ],
  },
  {
    category: "Content Generation",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
    tutorials: [
      {
        title: "SEO-Optimized Blog Writing",
        description:
          "Generate engaging blog content that ranks well in search engines",
        duration: "20 min",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
        href: "/tutorials/seo-blog-writing",
      },
      {
        title: "Product Description Generation",
        description: "Create compelling product descriptions that convert",
        duration: "15 min",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        href: "/tutorials/product-descriptions",
      },
    ],
  },
  {
    category: "Code Generation",
    icon: Code,
    color: "bg-orange-500/10 text-orange-500",
    tutorials: [
      {
        title: "API Integration with AI",
        description: "Generate and optimize API integration code automatically",
        duration: "35 min",
        level: "Advanced",
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        href: "/tutorials/api-integration",
      },
      {
        title: "React Component Generation",
        description: "Build React components faster with AI assistance",
        duration: "25 min",
        level: "Intermediate",
        image:
          "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=400&fit=crop",
        href: "/tutorials/react-components",
      },
    ],
  },
  {
    category: "Audio Processing",
    icon: Music,
    color: "bg-pink-500/10 text-pink-500",
    tutorials: [
      {
        title: "Audio Enhancement and Cleanup",
        description: "Remove background noise and enhance audio quality",
        duration: "20 min",
        level: "Intermediate",
        image:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=400&fit=crop",
        href: "/tutorials/audio-enhancement",
      },
      {
        title: "Voice-Over Generation",
        description: "Create professional voice-overs using AI text-to-speech",
        duration: "15 min",
        level: "Beginner",
        image:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop",
        href: "/tutorials/voice-over",
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

export default function TutorialsPage() {
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
              Learn NexusAI Tools
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Step-by-step tutorials to help you master our AI tools and
              transform your workflow.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <Button size="lg" className="gap-2">
                <PlayCircle className="w-5 h-5" />
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="w-5 h-5" />
                View Curriculum
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Tutorials Sections */}
      {tutorials.map((section) => (
        <section key={section.category} className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-8"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center`}
                >
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.tutorials.map((tutorial) => (
                  <motion.div key={tutorial.title} variants={itemVariants}>
                    <Link href={tutorial.href}>
                      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="relative h-48">
                          <Image
                            src={tutorial.image}
                            alt={tutorial.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {tutorial.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {tutorial.level}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {tutorial.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center text-primary">
                            <span className="text-sm font-medium">
                              Start Tutorial
                            </span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

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
              Ready to Start Creating?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-8"
            >
              Put your learning into practice with our powerful AI tools.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" asChild>
                <Link href="/dashboard">Try NexusAI Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
