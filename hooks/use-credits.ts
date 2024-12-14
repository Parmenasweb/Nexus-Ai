"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/api/credits');
      setCredits(data.credits);
      setError(null);
    } catch (err) {
      setError('Failed to fetch credits');
      console.error('Error fetching credits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deductCredits = async (amount: number) => {
    if (credits < amount) {
      throw new Error('Insufficient credits');
    }
    setCredits(prev => prev - amount);
  };

  return {
    credits,
    isLoading,
    error,
    deductCredits,
    refreshCredits: fetchCredits,
    hasEnoughCredits: (amount: number) => credits >= amount
  };
};