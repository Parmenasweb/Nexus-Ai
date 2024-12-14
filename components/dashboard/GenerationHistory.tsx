"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DownloadCloud,
  Calendar,
  Clock,
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CodeIcon,
  AudioWaveformIcon,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface HistoryItem {
  id: string;
  toolType: string;
  action: string;
  prompt?: string;
  result?: string;
  credits: number;
  status: string;
  createdAt: string;
  metadata?: any;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const getToolIcon = (tool: string) => {
  switch (tool) {
    case "image":
      return ImageIcon;
    case "video":
      return VideoIcon;
    case "content":
      return FileTextIcon;
    case "code":
      return CodeIcon;
    case "audio":
      return AudioWaveformIcon;
    default:
      return ImageIcon;
  }
};

export function GenerationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  const { toast } = useToast();

  useEffect(() => {
    fetchHistory();
  }, [pagination.page, activeTab]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/history?page=${pagination.page}&limit=${pagination.limit}`
      );
      setHistory(data.history);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError("Failed to fetch history");
      toast({
        title: "Error",
        description: "Failed to load history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchHistory}>Try Again</Button>
      </div>
    );
  }

  const filteredHistory = history.filter(
    (item) => activeTab === "all" || item.toolType === activeTab
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="space-y-2">
            <Label>Filter by Type</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="generate">Generation</SelectItem>
                <SelectItem value="enhance">Enhancement</SelectItem>
                <SelectItem value="convert">Conversion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="credits">Credits Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredHistory.map((item) => {
            const Icon = getToolIcon(item.toolType);
            return (
              <Card key={item.id} className="p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {item.result && (
                    <div className="relative w-24 h-24">
                      {item.toolType === "video" ? (
                        <video
                          src={item.result}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src={item.result}
                          alt={`History item ${item.id}`}
                          width={500}
                          height={500}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium capitalize">
                        {item.action}
                      </span>
                    </div>
                    {item.prompt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.prompt}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(item.createdAt), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(item.createdAt), "HH:mm")}
                      </div>
                      <div>Credits used: {item.credits}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {item.result && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(item.result!)}
                      >
                        <DownloadCloud className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              disabled={pagination.page === 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={pagination.page === pagination.pages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              Next
            </Button>
          </div>
        )}
      </Tabs>
    </div>
  );
}
