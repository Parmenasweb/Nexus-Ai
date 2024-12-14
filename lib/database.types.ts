export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          credits: number
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
      }
      history: {
        Row: {
          id: string
          user_id: string
          tool_type: string
          action: string
          prompt: string | null
          result: string | null
          credits_used: number
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_type: string
          action: string
          prompt?: string | null
          result?: string | null
          credits_used: number
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_type?: string
          action?: string
          prompt?: string | null
          result?: string | null
          credits_used?: number
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}