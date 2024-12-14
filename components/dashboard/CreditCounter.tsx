"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CreditCounter() {
  // This would be fetched from your backend in a real application
  const credits = {
    used: 30,
    total: 50,
    percentage: (30 / 50) * 100,
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Credits Remaining</h3>
        <div className="flex items-center justify-between text-2xl font-bold">
          <div>{credits.total - credits.used}</div>
          <div className="text-sm text-muted-foreground">/ {credits.total}</div>
        </div>
        <Progress value={credits.percentage} className="h-2" />
      </div>
    </Card>
  );
}