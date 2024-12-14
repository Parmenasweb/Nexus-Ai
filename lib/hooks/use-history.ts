"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export interface HistoryEntry {
  id: string;
  userId: string;
  toolType: string;
  action: string;
  prompt?: string;
  result?: string;
  credits: number;
  status: string;
  createdAt: string;
  metadata?: any;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface UseHistoryOptions {
  limit?: number;
  initialPage?: number;
}

export function useHistory(options: UseHistoryOptions = {}) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: options.initialPage || 1,
    limit: options.limit || 10,
    total: 0,
    pages: 0,
  });

  const supabase = createClient();

  const fetchHistory = async (page = pagination.page) => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Calculate offset
      const from = (page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;

      // Get history entries
      const {
        data: entries,
        error,
        count,
      } = await supabase
        .from("history")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      setHistory(entries as HistoryEntry[]);
      setPagination((prev) => ({
        ...prev,
        page,
        total: count || 0,
        pages: Math.ceil((count || 0) / pagination.limit),
      }));
      setError(null);
    } catch (err: any) {
      console.error("Error fetching history:", err);
      setError(err.message);
      toast.error("Failed to fetch history", {
        description: "Please try refreshing the page",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (
    entry: Omit<HistoryEntry, "id" | "userId" | "createdAt">
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("history")
        .insert([{ ...entry, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setHistory((prev) => [data as HistoryEntry, ...prev]);
      setPagination((prev) => ({
        ...prev,
        total: prev.total + 1,
        pages: Math.ceil((prev.total + 1) / pagination.limit),
      }));

      return data as HistoryEntry;
    } catch (err: any) {
      console.error("Error creating history entry:", err);
      toast.error("Failed to save history", {
        description:
          "Your action was completed but we couldn't save it to history",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    pagination,
    fetchHistory,
    createEntry,
  };
}
