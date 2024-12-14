"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface DashboardStats {
  totalGenerations: number;
  usageTimeHours: number;
  currentPlan: string;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGenerations: 0,
    usageTimeHours: 0,
    currentPlan: "free",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch user profile for plan info
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch history stats
      const { data: historyData, error: historyError } = await supabase
        .from("history")
        .select("created_at")
        .eq("user_id", user.id);

      if (historyError) throw historyError;

      // Calculate stats
      const totalGenerations = historyData.length;

      // Calculate usage time (time between first and last generation)
      let usageTimeHours = 0;
      if (historyData.length > 1) {
        const timestamps = historyData.map((h) =>
          new Date(h.created_at).getTime()
        );
        const firstUsage = Math.min(...timestamps);
        const lastUsage = Math.max(...timestamps);
        usageTimeHours = Math.round(
          (lastUsage - firstUsage) / (1000 * 60 * 60)
        );
      }

      setStats({
        totalGenerations,
        usageTimeHours,
        currentPlan: profile.plan_type,
      });
      setError(null);
    } catch (err: any) {
      console.error("Error fetching dashboard stats:", err);
      setError(err.message);
      toast.error("Failed to fetch dashboard statistics", {
        description: "Please try refreshing the page",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
}
