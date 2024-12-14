"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCredits } from "@/hooks/use-credits";
import { Loader2, CreditCard, History, Package } from "lucide-react";

export default function BillingPage() {
  const { credits, isLoading } = useCredits();

  const plans = [
    {
      name: "Free",
      price: "0",
      credits: "50 daily",
      features: [
        "Basic AI tools access",
        "Standard processing speed",
        "Community support",
        "720p video quality",
      ]
    },
    {
      name: "Pro",
      price: "29",
      credits: "500 daily",
      features: [
        "All AI tools access",
        "Priority processing",
        "Email support",
        "4K video quality",
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      credits: "Unlimited",
      features: [
        "Custom AI model training",
        "Dedicated processing",
        "24/7 priority support",
        "8K video quality",
      ]
    }
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing & Subscription"
        text="Manage your plan and billing details"
      />
      
      <div className="grid gap-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4 flex-1">
              <h3 className="text-lg font-medium">Current Plan</h3>
              <div className="flex items-center gap-4">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">Free Plan</p>
                  <p className="text-sm text-muted-foreground">
                    50 credits refreshed daily
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <h3 className="text-lg font-medium">Credits Available</h3>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{credits} credits</span>
                    <span>50 max</span>
                  </div>
                  <Progress value={(credits / 50) * 100} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </Card>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={`p-6 ${plan.popular ? 'border-primary' : ''}`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-2xl font-bold">
                        ${plan.price}
                        {typeof plan.price === "number" && (
                          <span className="text-sm font-normal text-muted-foreground">
                            /month
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{plan.credits} credits</p>
                      {plan.features.map((feature) => (
                        <p key={feature}>✓ {feature}</p>
                      ))}
                    </div>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Free Plan</p>
                    <p className="text-sm text-muted-foreground">Started on Mar 1, 2024</p>
                  </div>
                  <p className="text-sm">$0.00</p>
                </div>
                <div className="flex justify-center py-8">
                  <p className="text-muted-foreground">No billing history available</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">No payment method added</p>
                <Button variant="link" className="p-0">
                  Add payment method
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}