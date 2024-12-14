"use client";

import { motion } from "framer-motion";
import { 
  ImageIcon, 
  VideoIcon, 
  FileTextIcon, 
  Code2Icon, 
  WandIcon, 
  AudioWaveformIcon 
} from "lucide-react";
import { Card } from "@/components/ui/card";

const tools = [
  {
    title: "Image Enhancement",
    description: "Remove backgrounds, enhance quality, and transform your images",
    icon: ImageIcon,
    color: "bg-pink-500/10",
    textColor: "text-pink-500"
  },
  {
    title: "Text to Video",
    description: "Convert your text descriptions into engaging video content",
    icon: VideoIcon,
    color: "bg-purple-500/10",
    textColor: "text-purple-500"
  },
  {
    title: "Content Generation",
    description: "Generate high-quality articles, blog posts, and marketing copy",
    icon: FileTextIcon,
    color: "bg-blue-500/10",
    textColor: "text-blue-500"
  },
  {
    title: "Code Assistant",
    description: "Get help with coding, debugging, and code optimization",
    icon: Code2Icon,
    color: "bg-green-500/10",
    textColor: "text-green-500"
  },
  {
    title: "Image Generation",
    description: "Create stunning images from text descriptions",
    icon: WandIcon,
    color: "bg-orange-500/10",
    textColor: "text-orange-500"
  },
  {
    title: "Audio Generation",
    description: "Convert text to natural-sounding speech and create music",
    icon: AudioWaveformIcon,
    color: "bg-yellow-500/10",
    textColor: "text-yellow-500"
  }
];

export default function Tools() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">AI-Powered Tools</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our suite of powerful AI tools designed to enhance your creativity
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-lg ${tool.color} ${tool.textColor} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}