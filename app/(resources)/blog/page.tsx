"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, Tag, ChevronRight, Search } from "lucide-react";

const featuredPosts = [
  {
    title: "The Future of AI in Enterprise Applications",
    excerpt:
      "Explore how artificial intelligence is transforming enterprise software and what it means for businesses.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    date: "2024-03-15",
    readTime: "8 min",
    category: "AI Trends",
    author: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  },
  {
    title: "Building Scalable AI Systems: Best Practices",
    excerpt:
      "Learn the key principles and best practices for building AI systems that can scale with your business needs.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    date: "2024-03-12",
    readTime: "10 min",
    category: "Development",
    author: {
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
  {
    title: "AI Security: Protecting Your Models and Data",
    excerpt:
      "Discover essential security practices for protecting your AI models and sensitive data in production.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop",
    date: "2024-03-10",
    readTime: "12 min",
    category: "Security",
    author: {
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
];

const categories = [
  { name: "AI Trends", count: 25 },
  { name: "Development", count: 42 },
  { name: "Security", count: 18 },
  { name: "Machine Learning", count: 31 },
  { name: "Case Studies", count: 15 },
  { name: "Tutorials", count: 28 },
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

export default function BlogPage() {
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
              NexusAI Blog
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Insights, tutorials, and updates from our team of AI experts.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="search"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredPosts.map((post) => (
              <motion.div key={post.title} variants={itemVariants}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {post.author.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                          <Clock className="w-4 h-4 ml-2" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary">
                          {post.category}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        asChild
                      >
                        <Link
                          href={`/blog/${post.title
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        >
                          Read more
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-8 text-center"
            >
              Browse by Category
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog/category/${category.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  <Card className="p-4 text-center hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} articles
                    </p>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
