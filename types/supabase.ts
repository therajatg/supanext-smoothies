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
          created_at: string | null
          email: string
          id: number
          password: string
        }
        Insert: {
          created_at?: string | null
          email?: string
          id?: number
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          password?: string
        }
        Relationships: []
      }
      smoothies: {
        Row: {
          created_at: string | null
          id: number
          method: string | null
          rating: number | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          method?: string | null
          rating?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          method?: string | null
          rating?: number | null
          title?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
