"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const showcaseItems = [
  {
    title: "Image Enhancement",
    before: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=500&q=80",
    after: "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?w=500&q=80",
    description: "Transform your images with our advanced AI enhancement tools"
  },
  {
    title: "Video Generation",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&q=80",
    description: "Create stunning videos from text in minutes"
  },
  {
    title: "Content Writing",
    example: "Our AI transformed a brief into a compelling marketing copy in seconds",
    description: "Generate high-quality content for any purpose"
  }
];

export default function Showcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">See NexusAI in Action</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the power of our AI tools through real-world examples
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  
                  {item.before && item.after && (
                    <div className="space-y-4">
                      <div className="relative h-48">
                        <img src={item.before} alt="Before" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
                          Before
                        </div>
                      </div>
                      <div className="relative h-48">
                        <img src={item.after} alt="After" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
                          After
                        </div>
                      </div>
                    </div>
                  )}

                  {item.thumbnail && (
                    <div className="relative h-64">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <Button variant="secondary" className="w-full">
                          Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {item.example && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm italic">{item.example}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}