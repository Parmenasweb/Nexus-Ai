"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getUsageMetrics } from "@/lib/api/utils";
import { UsageMetrics } from "@/lib/api-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = {
  fal: "#2563eb",
  openai: "#10b981",
  deepai: "#8b5cf6",
  success: "#22c55e",
  error: "#ef4444",
};

const TIME_RANGES = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

type ServiceType = "fal" | "openai" | "deepai" | "all";

export function UsageAnalytics() {
  const [metrics, setMetrics] = useState<UsageMetrics[]>([]);
  const [timeRange, setTimeRange] = useState<keyof typeof TIME_RANGES>("24h");
  const [selectedService, setSelectedService] = useState<ServiceType>("all");

  useEffect(() => {
    // Update metrics every minute
    const updateMetrics = () => {
      setMetrics(
        getUsageMetrics(
          selectedService === "all"
            ? undefined
            : (selectedService as Exclude<ServiceType, "all">),
          TIME_RANGES[timeRange]
        )
      );
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 60000);
    return () => clearInterval(interval);
  }, [timeRange, selectedService]);

  // Calculate statistics
  const totalRequests = metrics.length;
  const successRate =
    (metrics.filter((m) => m.success).length / totalRequests) * 100 || 0;
  const avgLatency =
    metrics.reduce((acc, m) => acc + m.latency, 0) / totalRequests || 0;
  const requestsByService = metrics.reduce((acc, m) => {
    acc[m.service] = (acc[m.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const chartData = metrics
    .reduce((acc, m) => {
      const hour = new Date(m.timestamp).toISOString().slice(0, 13);
      const existing = acc.find((d) => d.hour === hour);
      if (existing) {
        existing[m.service] = (existing[m.service] || 0) + 1;
        existing.total++;
      } else {
        acc.push({ hour, [m.service]: 1, total: 1 });
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => a.hour.localeCompare(b.hour));

  const pieData = Object.entries(requestsByService).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Usage Analytics</h2>
        <div className="flex items-center gap-4">
          <Select
            value={selectedService}
            onValueChange={(value: string) =>
              setSelectedService(value as ServiceType)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="fal">FAL AI</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="deepai">DeepAI</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as keyof typeof TIME_RANGES)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Requests
          </h3>
          <p className="mt-2 text-3xl font-bold">{totalRequests}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Success Rate
          </h3>
          <p className="mt-2 text-3xl font-bold">{successRate.toFixed(1)}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Avg. Latency
          </h3>
          <p className="mt-2 text-3xl font-bold">{avgLatency.toFixed(0)}ms</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Services
          </h3>
          <p className="mt-2 text-3xl font-bold">
            {Object.keys(requestsByService).length}
          </p>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Requests Over Time</TabsTrigger>
          <TabsTrigger value="distribution">Service Distribution</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card className="p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  {Object.keys(requestsByService).map((service) => (
                    <Line
                      key={service}
                      type="monotone"
                      dataKey={service}
                      stroke={COLORS[service as keyof typeof COLORS]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[entry.name as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Recent Errors</h3>
                <div className="space-y-2">
                  {metrics
                    .filter((m) => !m.success)
                    .slice(-5)
                    .reverse()
                    .map((error, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{error.error?.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{error.service}</Badge>
                            <span>{error.endpoint}</span>
                            <span>•</span>
                            <span>
                              {new Date(error.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Badge variant="destructive">{error.error?.type}</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
