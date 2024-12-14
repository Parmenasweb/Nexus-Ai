"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are credits and how do they work?",
    answer: "Credits are our platform's currency for using AI tools. Free users receive 50 credits daily, which refresh every 24 hours. Different tools consume varying amounts of credits based on complexity and processing requirements."
  },
  {
    question: "How does the credit system work for different tools?",
    answer: "Credit consumption varies by tool and complexity. For example, basic image enhancements might cost 1-2 credits, while video generation could use 10-20 credits depending on length and quality settings."
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes! You can change your subscription plan at any time. When upgrading, you'll immediately get access to additional credits and features. Downgrades take effect at the start of your next billing cycle."
  },
  {
    question: "What happens to unused credits?",
    answer: "Free plan credits expire daily. For paid plans, credits roll over for up to 30 days, ensuring you never lose value from your subscription."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, we provide customized enterprise solutions with dedicated support, custom AI model training, and flexible API integration options. Contact our sales team for more information."
  }
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to know about NexusAI
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}