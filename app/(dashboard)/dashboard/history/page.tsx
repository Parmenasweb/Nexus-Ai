"use client";

import { useState } from "react";
import { useHistory, type HistoryEntry } from "@/lib/hooks/use-history";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Search,
  Image as ImageIcon,
  FileText,
  Code,
  Video,
  AudioLines,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TOOL_ICONS = {
  image: ImageIcon,
  content: FileText,
  code: Code,
  video: Video,
  audio: AudioLines,
} as const;

const STATUS_BADGES = {
  completed: { variant: "default" as const, icon: CheckCircle2, className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
  failed: { variant: "destructive" as const, icon: XCircle, className: "" },
  processing: { variant: "secondary" as const, icon: Clock, className: "" },
} as const;

export default function HistoryPage() {
  const { history, loading, error, pagination, fetchHistory } = useHistory({
    limit: 10,
  });
  const [toolFilter, setToolFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredHistory = history.filter((entry) => {
    const matchesTool = toolFilter === "all" || entry.toolType === toolFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.prompt && entry.prompt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTool && matchesStatus && matchesSearch;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">History</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={toolFilter} onValueChange={setToolFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Tool Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tools</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!filteredHistory.length ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableCaption>Your generation history</TableCaption>
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
                {filteredHistory.map((entry: HistoryEntry) => {
                  const ToolIcon = TOOL_ICONS[entry.toolType as keyof typeof TOOL_ICONS] || FileText;
                  const status = STATUS_BADGES[entry.status as keyof typeof STATUS_BADGES];
                  const StatusIcon = status?.icon || Clock;

                  return (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ToolIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{entry.toolType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate" title={entry.action}>
                          {entry.action}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={status?.variant}
                          className={cn(
                            "flex w-fit items-center gap-1",
                            status?.className
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{entry.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.credits}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {format(new Date(entry.createdAt), "MMM d, yyyy")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(entry.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
      )}
    </div>
  );
}