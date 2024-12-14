"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface UseCreditsOptions {
  initialCredits?: number;
}

export function useCredits(options: UseCreditsOptions = {}) {
  const [credits, setCredits] = useState<number>(options.initialCredits || 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchCredits = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setCredits(data.credits);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching credits:", err);
      setError(err.message);
      toast.error("Failed to fetch credits", {
        description: "Please try refreshing the page",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = async (newCredits: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", user.id);

      if (error) throw error;
      setCredits(newCredits);
      setError(null);
    } catch (err: any) {
      console.error("Error updating credits:", err);
      setError(err.message);
      toast.error("Failed to update credits", {
        description: "Please try again later",
      });
      throw err;
    }
  };

  const deductCredits = (amount: number) => {
    setCredits((prevCredits) => Math.max(prevCredits - amount, 0));
  };

  const hasEnoughCredits = (cost: number): boolean => {
    return credits >= cost;
  };

  return {
    credits,
    loading,
    error,
    fetchCredits,
    updateCredits,
    deductCredits,
    hasEnoughCredits,
  };
}
