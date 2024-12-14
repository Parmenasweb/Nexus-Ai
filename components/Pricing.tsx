"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const plans = [
  {
    name: "Free",
    price: "0",
    priceId: "", // No price ID for free plan
    features: [
      "50 credits",
      "Basic AI tools access",
      "Standard processing speed",
      "Community support",
      "720p video quality",
      "Basic API access",
    ],
  },
  {
    name: "Basic",
    price: "14.99",
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    features: [
      "200 credits",
      "All AI tools access",
      "Standard processing speed",
      "Email support",
      "1080p video quality",
      "Basic API access",
    ],
  },
  {
    name: "Pro",
    price: "49.99",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    features: [
      "1000 credits",
      "All AI tools access",
      "Priority processing",
      "Priority support",
      "4K video quality",
      "Full API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: "", // Custom handling for enterprise
    features: [
      "Unlimited credits",
      "Custom AI model training",
      "Dedicated processing",
      "24/7 priority support",
      "8K video quality",
      "Custom API solutions",
    ],
  },
];

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubscription = async (priceId: string, planName: string) => {
    try {
      setIsLoading(planName);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
          variant: "destructive",
        });
        return;
      }

      // Create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleEnterprise = () => {
    window.location.href =
      "mailto:enterprise@yourdomain.com?subject=Enterprise%20Plan%20Inquiry";
  };

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
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`p-8 relative h-full flex flex-col ${
                  plan.popular ? "border-purple-500 border-2" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    {plan.price === "Custom" ? (
                      <span className="text-4xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">$</span>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-300 ml-2">
                          /month
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-auto"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() =>
                    plan.name === "Enterprise"
                      ? handleEnterprise()
                      : handleSubscription(plan.priceId!, plan.name)
                  }
                  disabled={isLoading === plan.name}
                >
                  {isLoading === plan.name ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </div>
                  ) : plan.name === "Enterprise" ? (
                    "Contact Sales"
                  ) : (
                    `Get ${plan.name}`
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
