"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCredits } from "@/lib/hooks/use-credits";
import { useHistory, type HistoryEntry } from "@/lib/hooks/use-history";
import { useDashboardStats } from "@/lib/hooks/use-dashboard-stats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  AudioWaveformIcon,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { Coins, Clock, Zap, Crown, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Mock data for the chart
const usageData = [
  { date: "Mar 1", credits: 30 },
  { date: "Mar 2", credits: 45 },
  { date: "Mar 3", credits: 25 },
  { date: "Mar 4", credits: 60 },
  { date: "Mar 5", credits: 40 },
  { date: "Mar 6", credits: 35 },
  { date: "Mar 7", credits: 50 },
];

const quickActions = [
  {
    title: "Generate Image",
    icon: ImageIcon,
    href: "/dashboard/image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Create Video",
    icon: VideoIcon,
    href: "/dashboard/video",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Write Content",
    icon: FileTextIcon,
    href: "/dashboard/content",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Generate Code",
    icon: CodeIcon,
    href: "/dashboard/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Create Audio",
    icon: AudioWaveformIcon,
    href: "/dashboard/audio",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];
import { Badge } from "@/components/ui/badge";

function StatsCard({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string | number;
  icon: any;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
function HistoryTable() {
  const { history, loading, error, pagination, fetchHistory } = useHistory({
    limit: 10,
  });
  if (loading && !history.length) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-12 w-[100px]" />
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-12 w-[100px]" />
            <Skeleton className="h-12 w-[80px]" />
            <Skeleton className="h-12 w-[120px]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load history: {error}</AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableCaption>Your recent activity</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tool</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry: HistoryEntry) => (
              <TableRow key={entry.id}>
                <TableCell className="capitalize">{entry.toolType}</TableCell>
                <TableCell>{entry.action}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      entry.status === "completed"
                        ? "default"
                        : entry.status === "failed"
                        ? "destructive"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>{entry.credits}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(entry.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination.pages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => fetchHistory(pagination.page - 1)}
                isActive={pagination.page > 1}
              />
            </PaginationItem>
            {Array.from({ length: pagination.pages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => fetchHistory(i + 1)}
                  isActive={pagination.page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => fetchHistory(pagination.page + 1)}
                isActive={pagination.page < pagination.pages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const {
    history,
    loading: historyLoading,
    error: historyError,
    pagination,
    fetchHistory,
  } = useHistory({
    limit: 10,
  });
  const { credits } = useCredits();
  const { stats, loading: statsLoading } = useDashboardStats();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Welcome back!"
        text="Monitor your AI tools usage and quick access to features"
      />

      <div className="grid gap-6">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">
                Available Credits
              </span>
              <div className="flex items-center justify-between">
                {statsLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <span className="text-2xl font-bold">{credits}</span>
                )}
                <div
                  className={`p-2 ${
                    credits > 25
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  } rounded-full`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <Progress value={(credits / 50) * 100} className="h-1" />
              <span className="text-xs text-muted-foreground">
                50 max credits
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">
                Total Generations
              </span>
              <div className="flex items-center justify-between">
                {statsLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <span className="text-2xl font-bold">
                    {stats.totalGenerations}
                  </span>
                )}
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                +12% from last week
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">Usage Time</span>
              <div className="flex items-center justify-between">
                {statsLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <span className="text-2xl font-bold">
                    {stats.usageTimeHours}h
                  </span>
                )}
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-full">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                Active today
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">
                Current Plan
              </span>
              <div className="flex items-center justify-between">
                {statsLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <span className="text-2xl font-bold">
                    {stats.currentPlan}
                  </span>
                )}
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto text-xs">
                <Link href="/pricing">Upgrade now</Link>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card className="p-6">
          <h3 className="font-medium mb-6">Credits Usage</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="credits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6">
          <h3 className="font-medium">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="space-y-3">
                  <div
                    className={`${action.bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Start now
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <HistoryTable />
      </div>

      {/* Keep existing Usage Chart section */}
      {/* Keep existing Quick Actions section */}
      {/* Keep existing Recent Activity section */}
    </DashboardShell>
  );
}
